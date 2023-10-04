import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {FormBuilder, FormGroup} from "@angular/forms";
import {BodyService} from "../../body.service";
import {DatePipe, DecimalPipe} from "@angular/common";
import {BodyMeasurementDto} from "../../model/body-measurement-dto.model";
import {Subscription} from "rxjs";
import {MeasurementUnitsService} from "../../../../../commons/services/mesurement-units/measurement-units.service";

@Component({
  selector: 'app-add-body-measurement',
  templateUrl: './add-body-measurement.page.html',
  styleUrls: ['./add-body-measurement.page.scss'],
})
export class AddBodyMeasurementPage implements OnInit {

  private measurementUnitsSubscription!: Subscription;
  lengthUnitShortcut!: string;

  addBodyMeasurementsForm = this.formBuilder.group({
    chest: [''],
    bicepsLeft: [''],
    bicepsRight: [''],
    forearmLeft: [''],
    forearmRight: [''],
    waist: [''],
    hip: [''],
    thighLeft: [''],
    thighRight: [''],
    calfLeft: [''],
    calfRight: [''],
    measurementDate: [this.datePipe.transform(Date.now(), 'yyyy-MM-ddTHH:mm')]
  });

  constructor( private router: Router, private formBuilder: FormBuilder,
               private bodyService: BodyService, private datePipe: DatePipe,
               private measurementUnitsService: MeasurementUnitsService,
               private decimalPipe: DecimalPipe) {
  }

  ngOnInit() {
    this.bodyService.getLatestBodyMeasurement().subscribe(response => {
      this.fillFormFields(response)
    });
    this.initializeMeasurementUnitsShortcuts();
  }

  private fillFormFields(bodyMeasurementDto: BodyMeasurementDto) {
    this.addBodyMeasurementsForm.patchValue({
      chest: this.decimalPipe.transform(bodyMeasurementDto?.chest?.toString(), '1.0-2') ?? '',
      bicepsLeft: this.decimalPipe.transform(bodyMeasurementDto?.bicepsLeft?.toString(), '1.0-2') ?? '',
      bicepsRight: this.decimalPipe.transform(bodyMeasurementDto?.bicepsRight?.toString(), '1.0-2') ?? '',
      forearmLeft: this.decimalPipe.transform(bodyMeasurementDto?.forearmLeft?.toString(), '1.0-2') ?? '',
      forearmRight: this.decimalPipe.transform(bodyMeasurementDto?.forearmRight?.toString(), '1.0-2') ?? '',
      waist: this.decimalPipe.transform(bodyMeasurementDto?.waist?.toString(), '1.0-2') ?? '',
      hip: this.decimalPipe.transform(bodyMeasurementDto?.hip?.toString(), '1.0-2') ?? '',
      thighLeft: this.decimalPipe.transform(bodyMeasurementDto?.thighLeft?.toString(), '1.0-2') ?? '',
      thighRight: this.decimalPipe.transform(bodyMeasurementDto?.thighRight?.toString(), '1.0-2') ?? '',
      calfLeft: this.decimalPipe.transform(bodyMeasurementDto?.calfLeft?.toString(), '1.0-2') ?? '',
      calfRight: this.decimalPipe.transform(bodyMeasurementDto?.calfRight?.toString(), '1.0-2') ?? ''
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
  }

  validateAndSendMeasurementForm(addBodyMeasurementForm: FormGroup) {
    let bodyMeasurement: BodyMeasurementDto = addBodyMeasurementForm.value;
    bodyMeasurement.lengthUnit = this.measurementUnitsService.lengthUnit;
    this.bodyService.addNewBodyMeasurement(bodyMeasurement).subscribe(responseData => {
      this.bodyService.notifyAboutBodyMeasurementChange();
      this.router.navigate(['tabs', 'body']);
    });
  }
}
