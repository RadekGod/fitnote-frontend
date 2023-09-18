import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {FormBuilder, FormGroup} from "@angular/forms";
import {BodyService} from "../body.service";
import {DatePipe} from "@angular/common";
import {GeneralMeasurementDto} from "../model/general-measurement-dto.model";
import {Subscription} from "rxjs";
import {MeasurementUnitsService} from "../../../../commons/services/mesurement-units/measurement-units.service";

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
               private datePipe: DatePipe, private route: ActivatedRoute, private measurementUnitsService: MeasurementUnitsService) {
  }

  ngOnInit() {
    this.bodyService.getLatestGeneralMeasurement().subscribe(response => {
      this.fillFormFields(response);
    });
    this.initializeMeasurementUnitsShortcuts();
  }

  private fillFormFields(generalMeasurementDto: GeneralMeasurementDto) {
    this.editGeneralMeasurementsForm.patchValue({
      weight: generalMeasurementDto?.weight?.toString() ?? '',
      height: generalMeasurementDto?.height?.toString() ?? '',
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
    });
  }

  getMeasurementUnitsShortcuts() {
    this.lengthUnitShortcut = this.measurementUnitsService.lengthUnitShortcut;
    this.weightUnitShortcut = this.measurementUnitsService.weightUnitShortcut;
  }

  validateAndSendMeasurementForm(addGeneralMeasurementForm: FormGroup) {
    let generalMeasurementId = Number(this.route.snapshot.paramMap.get('id'));
    this.bodyService.editGeneralMeasurement(generalMeasurementId, addGeneralMeasurementForm.value).subscribe(responseData => {
      this.bodyService.notifyAboutGeneralMeasurementChange();
      this.router.navigate(['tabs', 'body']);
    });
  }
}
