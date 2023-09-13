import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {FormBuilder, FormGroup} from "@angular/forms";
import {BodyService} from "../body.service";
import {DatePipe} from "@angular/common";

@Component({
  selector: 'app-edit-body-measurement',
  templateUrl: './edit-body-measurement.page.html',
  styleUrls: ['./edit-body-measurement.page.scss'],
})
export class EditBodyMeasurementPage implements OnInit {

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
               private datePipe: DatePipe, private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.bodyService.getLatestBodyMeasurement().subscribe(response => {
      this.editBodyMeasurementForm.patchValue({
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
        measurementDate: this.datePipe.transform(response?.measurementDate, 'yyyy-MM-ddTHH:mm')
      });
    });
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
