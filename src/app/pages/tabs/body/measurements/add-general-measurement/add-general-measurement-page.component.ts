import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {Router} from "@angular/router";
import {BodyService} from "../../body.service";
import {DatePipe, DecimalPipe} from "@angular/common";
import {Subscription} from "rxjs";
import {MeasurementUnitsService} from "../../../../../commons/services/mesurement-units/measurement-units.service";
import {GeneralMeasurementDto} from "../../model/general-measurement-dto.model";

@Component({
  selector: 'app-add-general-measurements',
  templateUrl: './add-general-measurement.page.html',
  styleUrls: ['./add-general-measurement.page.scss'],
})
export class AddGeneralMeasurementPage implements OnInit {

  private measurementUnitsSubscription!: Subscription;
  lengthUnitShortcut!: string;
  weightUnitShortcut!: string;

  addGeneralMeasurementsForm = this.formBuilder.group({
    weight: [''],
    height: [''],
    muscleContent: [''],
    bodyFat: [''],
    measurementDate: [this.datePipe.transform(Date.now(), 'yyyy-MM-ddTHH:mm')]
  });

  constructor( private router: Router, private formBuilder: FormBuilder, private bodyService: BodyService,
               private datePipe: DatePipe, private measurementUnitsService: MeasurementUnitsService,
               private decimalPipe: DecimalPipe) {
  }

  ngOnInit() {
    this.bodyService.getLatestGeneralMeasurement().subscribe(response => {
      this.fillFormFields(response);
    });
    this.initializeMeasurementUnitsShortcuts();
  }

  private fillFormFields(generalMeasurementDto: GeneralMeasurementDto) {
    this.addGeneralMeasurementsForm.patchValue({
      height: this.decimalPipe.transform(generalMeasurementDto?.height?.toString(), '1.0-2') ?? '',
      weight: this.decimalPipe.transform(generalMeasurementDto?.weight?.toString(), '1.0-2') ?? '',
      muscleContent: generalMeasurementDto?.muscleContent?.toString() ?? '',
      bodyFat: generalMeasurementDto?.bodyFat?.toString() ?? ''
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
    let generalMeasurement: GeneralMeasurementDto = addGeneralMeasurementForm.value;
    generalMeasurement.lengthUnit = this.measurementUnitsService.lengthUnit;
    generalMeasurement.weightUnit = this.measurementUnitsService.weightUnit;
    this.bodyService.addNewGeneralMeasurement(generalMeasurement).subscribe(responseData => {
      this.bodyService.notifyAboutGeneralMeasurementChange();
      this.router.navigate(['tabs', 'body']);
    });
  }
}
