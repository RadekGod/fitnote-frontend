import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {FormBuilder, FormGroup} from "@angular/forms";
import {BodyService} from "../../body.service";
import {DatePipe, DecimalPipe} from "@angular/common";
import {GeneralMeasurementDto} from "../../model/general-measurement-dto.model";
import {Subscription} from "rxjs";
import {MeasurementUnitsService} from "../../../../../commons/services/mesurement-units/measurement-units.service";

@Component({
  selector: 'app-edit-general-measurements',
  templateUrl: './edit-general-measurement-page.component.html',
  styleUrls: ['./edit-general-measurement-page.component.scss'],
})
export class EditGeneralMeasurementPage implements OnInit {

  private measurementUnitsSubscription!: Subscription;
  lengthUnitShortcut!: string;
  weightUnitShortcut!: string;

  editGeneralMeasurementsForm = this.formBuilder.group({
    weight: [''],
    height: [''],
    muscleContent: [''],
    bodyFat: [''],
    measurementDate: [this.datePipe.transform(Date.now(), 'yyyy-MM-ddTHH:mm')]
  });

  constructor( private router: Router, private formBuilder: FormBuilder, private bodyService: BodyService,
               private datePipe: DatePipe, private route: ActivatedRoute,
               private measurementUnitsService: MeasurementUnitsService, private decimalPipe: DecimalPipe) {
  }

  ngOnInit() {
    this.fetchLatestGeneralMeasurement();
    this.initializeMeasurementUnitsShortcuts();
  }

  fetchLatestGeneralMeasurement() {
    this.bodyService.getLatestGeneralMeasurement().subscribe(response => {
      this.fillFormFields(response);
    });
  }

  private fillFormFields(generalMeasurementDto: GeneralMeasurementDto) {
    this.editGeneralMeasurementsForm.patchValue({
      height: this.decimalPipe.transform(generalMeasurementDto?.height?.toString(), '1.0-2') ?? '',
      weight: this.decimalPipe.transform(generalMeasurementDto?.weight?.toString(), '1.0-2') ?? '',
      muscleContent: generalMeasurementDto?.muscleContent?.toString() ?? '',
      bodyFat: generalMeasurementDto?.bodyFat?.toString() ?? '',
      measurementDate: this.datePipe.transform(generalMeasurementDto?.measurementDate, 'yyyy-MM-ddTHH:mm')
    });
  }
  initializeMeasurementUnitsShortcuts() {
    this.getMeasurementUnitsShortcuts();
    this.measurementUnitsSubscription = this.listenForMeasurementUnitChange();
  }

  listenForMeasurementUnitChange() {
    return this.measurementUnitsService.measurementUnitsChange.subscribe(() => {
      this.getMeasurementUnitsShortcuts();
      this.fetchLatestGeneralMeasurement();
    });
  }

  getMeasurementUnitsShortcuts() {
    this.lengthUnitShortcut = this.measurementUnitsService.lengthUnitShortcut;
    this.weightUnitShortcut = this.measurementUnitsService.weightUnitShortcut;
  }

  validateAndSendMeasurementForm(editGeneralMeasurementForm: FormGroup) {
    let generalMeasurementId = Number(this.route.snapshot.paramMap.get('id'));
    let generalMeasurement: GeneralMeasurementDto = editGeneralMeasurementForm.value;
    generalMeasurement.lengthUnit = this.measurementUnitsService.lengthUnit;
    generalMeasurement.weightUnit = this.measurementUnitsService.weightUnit;
    this.bodyService.editGeneralMeasurement(generalMeasurementId, generalMeasurement).subscribe(responseData => {
      this.bodyService.notifyAboutGeneralMeasurementChange();
      this.router.navigate(['tabs', 'body']);
    });
  }
}
