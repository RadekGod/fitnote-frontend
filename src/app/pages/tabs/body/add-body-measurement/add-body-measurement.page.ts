import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {FormBuilder, FormGroup} from "@angular/forms";
import {BodyService} from "../body.service";
import {DatePipe} from "@angular/common";

@Component({
  selector: 'app-add-body-measurement',
  templateUrl: './add-body-measurement.page.html',
  styleUrls: ['./add-body-measurement.page.scss'],
})
export class AddBodyMeasurementPage implements OnInit {

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

  constructor( private router: Router, private formBuilder: FormBuilder, private bodyService: BodyService,
               private datePipe: DatePipe) {
  }

  ngOnInit() {
    this.bodyService.getLatestBodyMeasurement().subscribe(response => {
      this.addBodyMeasurementsForm.patchValue({
        chest: response?.chest?.toString() ?? '',
        bicepsLeft: response?.bicepsLeft?.toString() ?? '',
        bicepsRight: response?.bicepsRight?.toString() ?? '',
        forearmLeft: response?.forearmLeft?.toString() ?? '',
        forearmRight: response?.forearmRight?.toString() ?? '',
        waist: response?.waist?.toString() ?? '',
        hip: response?.hip?.toString() ?? '',
        thighLeft: response?.thighLeft?.toString() ?? '',
        thighRight: response?.thighRight?.toString() ?? '',
        calfLeft: response?.calfLeft?.toString() ?? '',
        calfRight: response?.calfRight?.toString() ?? '',
      });
    });
  }

  validateAndSendMeasurementForm(addBodyMeasurementForm: FormGroup) {
    // this.router.navigate(['tabs', 'body']);
    this.bodyService.addNewBodyMeasurement(addBodyMeasurementForm.value).subscribe(responseData => {
      this.bodyService.notifyAboutBodyMeasurementChange();
      this.router.navigate(['tabs', 'body']);
    });
  }
}
