import { Component, OnInit } from '@angular/core';
import {ActivityTypeDto} from "../model/activity-type-dto.model";
import {AlertOptions} from "@ionic/angular";
import {ActivityService} from "../activity.service";
import {ToastService} from "../../../../../commons/services/toast/toast.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {TranslateService} from "@ngx-translate/core";
import {DatePipe} from "@angular/common";
import {Router} from "@angular/router";
import {ActivityDto} from "../model/activity-dto.model";

@Component({
  selector: 'app-add-activity-type',
  templateUrl: './add-activity-type.page.html',
  styleUrls: ['./add-activity-type.page.scss'],
})
export class AddActivityTypePage implements OnInit {

  formFailedValidation: boolean = false;
  activityTypes: ActivityTypeDto[] = [];

  constructor(private activityService: ActivityService,
              private toastService: ToastService,
              private formBuilder: FormBuilder,
              private router: Router) {
  }

  ngOnInit() {
    this.activityService.getAllActivityTypes().subscribe(response => {
      this.activityTypes = response;
      console.log(response);
    });
  }

  addActivityTypeForm = this.formBuilder.group({
    name: ['', Validators.required],
    distanceActivity: [false, Validators.required],
    averageCaloriesBurntPerHour: [0],
  });

  validateAndSendActivityTypeForm(addActivityTypeForm: FormGroup) {
    console.log(addActivityTypeForm.value);
    if (addActivityTypeForm.valid) {
      this.formFailedValidation = false;
      let activityType: ActivityTypeDto = addActivityTypeForm.value;
      this.activityService.addActivityType(activityType).subscribe(async responseData => {
        this.activityService.notifyAboutActivityTypesChange();
        this.clearActivityTypeFormData();
        await this.toastService.presentToast('success', 'TOAST_MESSAGES.ACTIVITY_TYPE_ADD_SUCCESS');
        await this.router.navigate(['tabs', 'more', 'activities']);
      }, async () => {
        await this.toastService.presentToast('error', 'TOAST_MESSAGES.ACTIVITY_TYPE_ADD_ERROR');
      });
    } else {
      this.formFailedValidation = true;
    }
  }

  clearActivityTypeFormData() {
    this.addActivityTypeForm.patchValue({
      name: '',
      distanceActivity: false,
      averageCaloriesBurntPerHour: 0
    });
    this.addActivityTypeForm.markAsPristine();
    this.addActivityTypeForm.markAsUntouched();
  }

  addBurntKilocalories() {
    let currentBurntKilocalories = this.addActivityTypeForm.get('averageCaloriesBurntPerHour')?.value!;
    this.addActivityTypeForm.get('averageCaloriesBurntPerHour')?.patchValue(currentBurntKilocalories + 10);
  }

  subtractBurntKilocalories() {
    let currentBurntKilocalories = this.addActivityTypeForm.get('averageCaloriesBurntPerHour')?.value!;
    if (currentBurntKilocalories > 10) {
      this.addActivityTypeForm.get('averageCaloriesBurntPerHour')?.patchValue(currentBurntKilocalories - 10);
    } else if (currentBurntKilocalories > 0) {
      this.addActivityTypeForm.get('averageCaloriesBurntPerHour')?.patchValue(currentBurntKilocalories - currentBurntKilocalories);
    }
  }
}
