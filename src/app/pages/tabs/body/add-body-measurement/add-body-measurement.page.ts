import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {FormBuilder, FormGroup} from "@angular/forms";
import {BodyService} from "../body.service";
import {DatePipe} from "@angular/common";
import {GeneralMeasurementDto} from "../model/general-measurement-dto.model";
import {BodyMeasurementDto} from "../model/body-measurement-dto.model";
import {Subscription} from "rxjs";
import {MeasurementUnitsService} from "../../../../commons/services/mesurement-units/measurement-units.service";

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
               private measurementUnitsService: MeasurementUnitsService) {
  }

  ngOnInit() {
    this.bodyService.getLatestBodyMeasurement().subscribe(response => {
      this.fillFormFields(response)
    });
    this.initializeMeasurementUnitsShortcuts();
  }

  private fillFormFields(bodyMeasurementDto: BodyMeasurementDto) {
    this.addBodyMeasurementsForm.patchValue({
      chest: bodyMeasurementDto?.chest?.toString() ?? '',
      bicepsLeft: bodyMeasurementDto?.bicepsLeft?.toString() ?? '',
      bicepsRight: bodyMeasurementDto?.bicepsRight?.toString() ?? '',
      forearmLeft: bodyMeasurementDto?.forearmLeft?.toString() ?? '',
      forearmRight: bodyMeasurementDto?.forearmRight?.toString() ?? '',
      waist: bodyMeasurementDto?.waist?.toString() ?? '',
      hip: bodyMeasurementDto?.hip?.toString() ?? '',
      thighLeft: bodyMeasurementDto?.thighLeft?.toString() ?? '',
      thighRight: bodyMeasurementDto?.thighRight?.toString() ?? '',
      calfLeft: bodyMeasurementDto?.calfLeft?.toString() ?? '',
      calfRight: bodyMeasurementDto?.calfRight?.toString() ?? '',
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
    this.bodyService.addNewBodyMeasurement(addBodyMeasurementForm.value).subscribe(responseData => {
      this.bodyService.notifyAboutBodyMeasurementChange();
      this.router.navigate(['tabs', 'body']);
    });
  }
}
