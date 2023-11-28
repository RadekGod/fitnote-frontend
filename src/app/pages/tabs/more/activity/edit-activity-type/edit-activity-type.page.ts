import {Component, OnInit} from '@angular/core';
import {ActivityTypeDto} from "../model/activity-type-dto.model";
import {ActivityService} from "../activity.service";
import {ToastService} from "../../../../../commons/services/toast/toast.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-edit-activity-type',
  templateUrl: './edit-activity-type.page.html',
  styleUrls: ['./edit-activity-type.page.scss'],
})
export class EditActivityTypePage implements OnInit {

  formFailedValidation: boolean = false;
  activityTypeId = Number(this.route.snapshot.paramMap.get('activityTypeId'));

  constructor(private activityService: ActivityService,
              private toastService: ToastService,
              private route: ActivatedRoute,
              private formBuilder: FormBuilder,
              private router: Router) {
  }

  ngOnInit() {
    this.activityService.getAllActivityTypes().subscribe(response => {
      this.fetchActivityTypesToEdit();
    });
  }

  editActivityTypeForm = this.formBuilder.group({
    name: ['', Validators.required],
    distanceActivity: [false, Validators.required],
    averageCaloriesBurntPerHour: [0],
  });

  fetchActivityTypesToEdit() {
    this.activityService.getActivityType(this.activityTypeId).subscribe(response => {
      this.fillFormFields(response);
    });
  }

  private fillFormFields(activityTypeDto: ActivityTypeDto) {
    this.editActivityTypeForm.patchValue({
      name: activityTypeDto.name ?? '',
      distanceActivity: activityTypeDto.distanceActivity ?? false,
      averageCaloriesBurntPerHour: activityTypeDto.averageCaloriesBurntPerHour ?? 0
    });
  }

  validateAndSendActivityTypeForm(editActivityTypeForm: FormGroup) {
    console.log(editActivityTypeForm.value);
    if (editActivityTypeForm.valid) {
      this.formFailedValidation = false;
      let activityType: ActivityTypeDto = editActivityTypeForm.value;
      this.activityService.editActivityType(this.activityTypeId, activityType).subscribe(async responseData => {
        this.activityService.notifyAboutActivityTypesChange();
        this.clearActivityTypeFormData();
        await this.toastService.presentToast('success', 'TOAST_MESSAGES.ACTIVITY_TYPE_UPDATE_SUCCESS');
        await this.router.navigate(['tabs', 'more', 'activities']);
      }, async () => {
        await this.toastService.presentToast('error', 'TOAST_MESSAGES.ACTIVITY_TYPE_UPDATE_ERROR');
      });
    } else {
      this.formFailedValidation = true;
    }
  }

  clearActivityTypeFormData() {
    this.editActivityTypeForm.patchValue({
      name: '',
      distanceActivity: false,
      averageCaloriesBurntPerHour: 0
    });
    this.editActivityTypeForm.markAsPristine();
    this.editActivityTypeForm.markAsUntouched();
  }

  addBurntCalories() {
    let currentBurntCalories = this.editActivityTypeForm.get('averageCaloriesBurntPerHour')?.value!;
    this.editActivityTypeForm.get('averageCaloriesBurntPerHour')?.patchValue(currentBurntCalories + 10);
  }

  subtractBurntCalories() {
    let currentBurntCalories = this.editActivityTypeForm.get('averageCaloriesBurntPerHour')?.value!;
    if (currentBurntCalories > 10) {
      this.editActivityTypeForm.get('averageCaloriesBurntPerHour')?.patchValue(currentBurntCalories - 10);
    } else if (currentBurntCalories > 0) {
      this.editActivityTypeForm.get('averageCaloriesBurntPerHour')?.patchValue(currentBurntCalories - currentBurntCalories);
    }
  }
}
