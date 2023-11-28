import {Component, OnInit} from '@angular/core';
import {ActivityTypeDto} from "../model/activity-type-dto.model";
import {AlertOptions} from "@ionic/angular";
import {ActivityService} from "../activity.service";
import {ToastService} from "../../../../../commons/services/toast/toast.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {TranslateService} from "@ngx-translate/core";
import {DatePipe} from "@angular/common";
import {ActivatedRoute, Router} from "@angular/router";
import {ActivityDto} from "../model/activity-dto.model";
import {UrlService} from "../../../../../commons/services/url/url.service";

@Component({
  selector: 'app-edit-activity',
  templateUrl: './edit-activity.page.html',
  styleUrls: ['./edit-activity.page.scss'],
})
export class EditActivityPage implements OnInit {

  formFailedValidation: boolean = false;
  activityTypes: ActivityTypeDto[] = [];
  activityId = Number(this.route.snapshot.paramMap.get('activityId'));

  activityTypeOptions: AlertOptions = {
    header: this.translate.instant('EXERCISE.ADD_CUSTOM_EXERCISE.ALERTS.EXERCISE_TYPE.HEADER'),
    subHeader: this.translate.instant('EXERCISE.ADD_CUSTOM_EXERCISE.ALERTS.EXERCISE_TYPE.SUBHEADER')
  };

  editActivityForm = this.formBuilder.group({
    activityDate: [this.datePipe.transform(Date.now(), 'yyyy-MM-ddTHH:mm'), Validators.required],
    activityType: [0, Validators.required],
    activityDurationInMinutes: [10, Validators.required],
    burntCalories: [0],
    distanceTraveled: [100],
  });


  constructor(private activityService: ActivityService,
              private toastService: ToastService,
              private formBuilder: FormBuilder,
              private route: ActivatedRoute,
              private translate: TranslateService,
              private datePipe: DatePipe,
              private router: Router) {
  }

  ngOnInit() {
    this.fetchActivityTypes();
    this.fetchActivityToEdit();
  }

  fetchActivityTypes() {
    this.activityService.getAllActivityTypes().subscribe(response => {
      this.activityTypes = response;
    });
  }

  fetchActivityToEdit() {
    this.activityService.getActivity(this.activityId).subscribe(response => {
      this.fillFormFields(response);
    });
  }

  private fillFormFields(activityDto: ActivityDto) {
    this.editActivityForm.patchValue({
      activityDate: this.datePipe.transform(activityDto?.activityDate, 'yyyy-MM-ddTHH:mm'),
      activityType: this.activityTypes
        .findIndex(activityType => activityType.id === activityDto.activityType.id) + 1,
      activityDurationInMinutes: activityDto.activityDurationInMinutes ?? 0,
      burntCalories: activityDto.burntCalories ?? 0,
      distanceTraveled: activityDto.distanceTraveled ?? 0
    });
  }


  validateAndSendActivityForm(editActivityForm: FormGroup) {
    if (editActivityForm.valid) {
      this.formFailedValidation = false;
      let activity: ActivityDto = editActivityForm.value;
      activity.activityType = {
        id: editActivityForm.controls['activityType'].value
      } as ActivityTypeDto;
      this.activityService.editActivity(this.activityId, activity).subscribe(async responseData => {
        this.activityService.notifyAboutActivitiesChange();
        this.clearActivityFormData();
        await this.toastService.presentToast('success', 'TOAST_MESSAGES.ACTIVITY_UPDATE_SUCCESS');
        await this.router.navigate(['tabs', 'more', 'activities']);
      }, async () => {
        await this.toastService.presentToast('error', 'TOAST_MESSAGES.ACTIVITY_UPDATE_ERROR');
      });
    } else {
      this.formFailedValidation = true;
    }
  }

  clearActivityFormData() {
    this.editActivityForm.patchValue({
      activityDate: this.datePipe.transform(Date.now(), 'yyyy-MM-ddTHH:mm'),
      activityType: null,
      activityDurationInMinutes: 10,
      burntCalories: 0,
      distanceTraveled: 100
    });
    this.editActivityForm.markAsPristine();
    this.editActivityForm.markAsUntouched();
  }

  addBurntCalories() {
    let currentBurntCalories = this.editActivityForm.get('burntCalories')?.value!;
    this.editActivityForm.get('burntCalories')?.patchValue(currentBurntCalories + 10);
  }

  subtractBurntCalories() {
    let currentBurntCalories = this.editActivityForm.get('burntCalories')?.value!;
    if (currentBurntCalories > 10) {
      this.editActivityForm.get('burntCalories')?.patchValue(currentBurntCalories - 10);
    } else if (currentBurntCalories > 0) {
      this.editActivityForm.get('burntCalories')?.patchValue(currentBurntCalories - currentBurntCalories);
    }
  }

  addActivityDurationInMinutes() {
    let currentActivityDurationInMinutes = this.editActivityForm.get('activityDurationInMinutes')?.value!;
    this.editActivityForm.get('activityDurationInMinutes')?.patchValue(currentActivityDurationInMinutes + 5);
  }

  subtractActivityDurationInMinutes() {
    let currentActivityDurationInMinutes = this.editActivityForm.get('activityDurationInMinutes')?.value!;
    if (currentActivityDurationInMinutes > 5) {
      this.editActivityForm.get('activityDurationInMinutes')?.patchValue(currentActivityDurationInMinutes - 5);
    } else if (currentActivityDurationInMinutes > 0) {
      this.editActivityForm.get('activityDurationInMinutes')?.patchValue(currentActivityDurationInMinutes - currentActivityDurationInMinutes);
    }
  }

  addDistanceTraveled() {
    let currentDistanceTraveled = this.editActivityForm.get('distanceTraveled')?.value!;
    this.editActivityForm.get('distanceTraveled')?.patchValue(currentDistanceTraveled + 100);
  }

  subtractDistanceTraveled() {
    let currentDistanceTraveled = this.editActivityForm.get('distanceTraveled')?.value!;
    if (currentDistanceTraveled > 5) {
      this.editActivityForm.get('distanceTraveled')?.patchValue(currentDistanceTraveled - 100);
    } else if (currentDistanceTraveled > 0) {
      this.editActivityForm.get('distanceTraveled')?.patchValue(currentDistanceTraveled - currentDistanceTraveled);
    }
  }

  isDistantActivity() {
    if (this.editActivityForm.get('activityType')?.value) {
      let temp = this.editActivityForm.get('activityType')?.value! - 1;
      if (this.activityTypes[temp].distanceActivity) {
        this.editActivityForm.controls['distanceTraveled'].enable();
        return true;
      } else {
        this.editActivityForm.controls['distanceTraveled'].disable();
        return false;
      }
    } else {
      return false;
    }
  }

}
