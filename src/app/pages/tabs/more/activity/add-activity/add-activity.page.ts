import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivityService} from "../activity.service";
import {ToastService} from "../../../../../commons/services/toast/toast.service";
import {Router} from "@angular/router";
import {ActivityDto} from "../model/activity-dto.model";
import {AlertOptions} from "@ionic/angular";
import {TranslateService} from "@ngx-translate/core";
import {DatePipe} from "@angular/common";
import {ActivityTypeDto} from "../model/activity-type-dto.model";

@Component({
  selector: 'app-add-activity',
  templateUrl: './add-activity.page.html',
  styleUrls: ['./add-activity.page.scss'],
})
export class AddActivityPage implements OnInit {

  formFailedValidation: boolean = false;
  activityTypes: ActivityTypeDto[] = [];


  activityTypeOptions: AlertOptions = {
    header: this.translate.instant('EXERCISE.ADD_CUSTOM_EXERCISE.ALERTS.EXERCISE_TYPE.HEADER'),
    subHeader: this.translate.instant('EXERCISE.ADD_CUSTOM_EXERCISE.ALERTS.EXERCISE_TYPE.SUBHEADER')
  };

  constructor(private activityService: ActivityService,
              private toastService: ToastService,
              private formBuilder: FormBuilder,
              private translate: TranslateService,
              private datePipe: DatePipe,
              private router: Router) {
  }

  ngOnInit() {
    this.activityService.getAllActivityTypes().subscribe(response => {
      this.activityTypes = response;
      console.log(response);
    });
  }

  addActivityForm = this.formBuilder.group({
    activityDate: [this.datePipe.transform(Date.now(), 'yyyy-MM-ddTHH:mm'), Validators.required],
    activityType: [null, Validators.required],
    activityDurationInMinutes: [10, Validators.required],
    burntKilocalories: [0],
    distanceTraveled: [100],
  });

  validateAndSendActivityForm(addActivityForm: FormGroup) {
    if (addActivityForm.valid) {
      this.formFailedValidation = false;
      let activity: ActivityDto = addActivityForm.value;
      activity.activityType = {
        id: addActivityForm.controls['activityType'].value
      } as ActivityTypeDto;
      this.activityService.addActivity(activity).subscribe(async responseData => {
        this.activityService.notifyAboutActivitiesChange();
        this.clearActivityFormData();
        await this.toastService.presentToast('success', 'TOAST_MESSAGES.ACTIVITY_ADD_SUCCESS');
        await this.router.navigate(['tabs', 'more', 'activities']);
      }, async () => {
        await this.toastService.presentToast('error', 'TOAST_MESSAGES.ACTIVITY_ADD_ERROR');
      });
    } else {
      this.formFailedValidation = true;
    }
  }

  clearActivityFormData() {
    this.addActivityForm.patchValue({
      activityDate: this.datePipe.transform(Date.now(), 'yyyy-MM-ddTHH:mm'),
      activityType: null,
      activityDurationInMinutes: 10,
      burntKilocalories: 0,
      distanceTraveled: 100
    });
    this.addActivityForm.markAsPristine();
    this.addActivityForm.markAsUntouched();
  }

  addActivityDurationInMinutes() {
    let currentActivityDurationInMinutes = this.addActivityForm.get('activityDurationInMinutes')?.value!;
    this.addActivityForm.get('activityDurationInMinutes')?.patchValue(currentActivityDurationInMinutes + 5);
  }

  subtractActivityDurationInMinutes() {
    let currentActivityDurationInMinutes = this.addActivityForm.get('activityDurationInMinutes')?.value!;
    if (currentActivityDurationInMinutes > 5) {
      this.addActivityForm.get('activityDurationInMinutes')?.patchValue(currentActivityDurationInMinutes - 5);
    } else if (currentActivityDurationInMinutes > 0) {
      this.addActivityForm.get('activityDurationInMinutes')?.patchValue(currentActivityDurationInMinutes - currentActivityDurationInMinutes);
    }
  }

  addBurntKilocalories() {
    let currentBurntKilocalories = this.addActivityForm.get('burntKilocalories')?.value!;
    this.addActivityForm.get('burntKilocalories')?.patchValue(currentBurntKilocalories + 10);
  }

  subtractBurntKilocalories() {
    let currentBurntKilocalories = this.addActivityForm.get('burntKilocalories')?.value!;
    if (currentBurntKilocalories > 10) {
      this.addActivityForm.get('burntKilocalories')?.patchValue(currentBurntKilocalories - 10);
    } else if (currentBurntKilocalories > 0) {
      this.addActivityForm.get('burntKilocalories')?.patchValue(currentBurntKilocalories - currentBurntKilocalories);
    }
  }

  addDistanceTraveled() {
    let currentDistanceTraveled = this.addActivityForm.get('distanceTraveled')?.value!;
    this.addActivityForm.get('distanceTraveled')?.patchValue(currentDistanceTraveled + 100);
  }

  subtractDistanceTraveled() {
    let currentDistanceTraveled = this.addActivityForm.get('distanceTraveled')?.value!;
    if (currentDistanceTraveled > 100) {
      this.addActivityForm.get('distanceTraveled')?.patchValue(currentDistanceTraveled - 100);
    } else if (currentDistanceTraveled > 0) {
      this.addActivityForm.get('distanceTraveled')?.patchValue(currentDistanceTraveled - currentDistanceTraveled);
    }
  }

  isDistantActivity() {
    if (this.addActivityForm.get('activityType')?.value) {
      let temp = this.addActivityForm.get('activityType')?.value! - 1;
      if (this.activityTypes[temp].distanceActivity) {
        this.addActivityForm.controls['distanceTraveled'].enable();
        return true;
      } else {
        this.addActivityForm.controls['distanceTraveled'].disable();
        return false;
      }
    } else {
      return false;
    }
  }
}
