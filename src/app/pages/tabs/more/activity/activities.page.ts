import {Component, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {Router} from "@angular/router";
import {ActivityService} from "./activity.service";
import {ActivityDto} from "./model/activity-dto.model";
import {ToastService} from "../../../../commons/services/toast/toast.service";
import {ActivityTypeDto} from "./model/activity-type-dto.model";

@Component({
  selector: 'app-activity',
  templateUrl: './activities.page.html',
  styleUrls: ['./activities.page.scss'],
})
export class ActivitiesPage implements OnInit {

  segmentValue: string = 'activityDiary';
  activities: ActivityDto[] | null = null;
  activityTypes: ActivityTypeDto[] | null = null;
  private activitySubscription!: Subscription;
  private activityTypesSubscription!: Subscription;
  lengthUnitShortcut!: string;
  weightUnitShortcut!: string;

  constructor(private router: Router,
              private activityService: ActivityService,
              private toastService: ToastService) { }

  async ngOnInit() {
    this.initializeActivities();
    this.initializeActivityTypes();
  }

  initializeActivities() {
    this.fetchActivities();
    this.activitySubscription = this.listenForActivitiesChange();
  }

  listenForActivitiesChange() {
    return this.activityService.activitiesChange.subscribe(() => {
      this.fetchActivities();
    });
  }

  fetchActivities() {
    this.activityService.getAllActivities().subscribe(response => {
      this.activities = response;
      console.log(this.activities);
    });
  }

  initializeActivityTypes() {
    this.fetchActivityTypes();
    this.activityTypesSubscription = this.listenForActivityTypesChange();
  }

  listenForActivityTypesChange() {
    return this.activityService.activityTypesChange.subscribe(() => {
      this.fetchActivityTypes();
    });
  }

  fetchActivityTypes() {
    this.activityService.getAllActivityTypes().subscribe(response => {
      this.activityTypes = response;
    });
  }

  changeSegmentValue(value: string) {
    this.segmentValue = value;
  }

  formatActivityDuration(activity: ActivityDto) {
    return this.activityService.formatActivityDuration(activity);
  }

  deleteActivity(activity: ActivityDto) {
    this.activityService.deleteActivity(activity.id).subscribe( async () => {
      this.activityService.notifyAboutActivitiesChange();
      await this.toastService.presentToast('success', 'TOAST_MESSAGES.ACTIVITY_DELETE_SUCCESS');
    }, async () => {
      await this.toastService.presentToast('error', 'TOAST_MESSAGES.ACTIVITY_DELETE_ERROR');
    });
  }

  deleteActivityType(activityType: ActivityTypeDto) {
    this.activityService.deleteActivityType(activityType.id).subscribe( async () => {
      this.activityService.notifyAboutActivityTypesChange();
      await this.toastService.presentToast('success', 'TOAST_MESSAGES.ACTIVITY_TYPE_DELETE_SUCCESS');
    }, async () => {
      await this.toastService.presentToast('error', 'TOAST_MESSAGES.ACTIVITY_TYPE_DELETE_ERROR');
    });
  }
}
