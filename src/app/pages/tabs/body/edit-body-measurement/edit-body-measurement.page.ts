import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {FormBuilder, FormGroup} from "@angular/forms";
import {BodyService} from "../body.service";
import {DatePipe} from "@angular/common";
import {Subscription} from "rxjs";
import {BodyMeasurementDto} from "../model/body-measurement-dto.model";
import {MeasurementUnitsService} from "../../../../commons/services/mesurement-units/measurement-units.service";

@Component({
  selector: 'app-edit-body-measurement',
  templateUrl: './edit-body-measurement.page.html',
  styleUrls: ['./edit-body-measurement.page.scss'],
})
export class EditBodyMeasurementPage implements OnInit {

  private measurementUnitsSubscription!: Subscription;
  lengthUnitShortcut!: string;

  editBodyMeasurementForm = this.formBuilder.group({
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

  constructor( private router: Router, private formBuilder: FormBuilder, private bodyService: BodyService,
               private datePipe: DatePipe, private route: ActivatedRoute,
               private measurementUnitsService: MeasurementUnitsService) {
  }

  ngOnInit() {
    this.bodyService.getLatestBodyMeasurement().subscribe(response => {
      this.fillFormFields(response)
    });
    this.initializeMeasurementUnitsShortcuts();
  }

  private fillFormFields(bodyMeasurementDto: BodyMeasurementDto) {
    this.editBodyMeasurementForm.patchValue({
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
      measurementDate: this.datePipe.transform(bodyMeasurementDto?.measurementDate, 'yyyy-MM-ddTHH:mm')
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

  validateAndSendMeasurementForm(editBodyMeasurementForm: FormGroup) {
    let bodyMeasurementId = Number(this.route.snapshot.paramMap.get('id'));
    // this.router.navigate(['tabs', 'body']);
    this.bodyService.editBodyMeasurement(bodyMeasurementId, editBodyMeasurementForm.value).subscribe(responseData => {
      this.bodyService.notifyAboutBodyMeasurementChange();
      this.router.navigate(['tabs', 'body']);
    });
  }
}
