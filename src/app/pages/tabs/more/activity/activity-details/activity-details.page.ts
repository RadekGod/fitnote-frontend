import { Component, OnInit } from '@angular/core';
import {ActivityDto} from "../model/activity-dto.model";
import {Subscription} from "rxjs";
import {ActivatedRoute, Router} from "@angular/router";
import {ActivityService} from "../activity.service";
import {ToastService} from "../../../../../commons/services/toast/toast.service";

@Component({
  selector: 'app-activity-details',
  templateUrl: './activity-details.page.html',
  styleUrls: ['./activity-details.page.scss'],
})
export class ActivityDetailsPage implements OnInit {

  activity: ActivityDto | null = null;
  activityId = Number(this.route.snapshot.paramMap.get('activityId'));
  private activitySubscription!: Subscription;

  constructor(private activityService: ActivityService,
              private route: ActivatedRoute) { }

  async ngOnInit() {
    this.initializeActivity();
  }

  initializeActivity() {
    this.fetchActivity();
    this.activitySubscription = this.listenForActivitiesChange();
  }

  listenForActivitiesChange() {
    return this.activityService.activitiesChange.subscribe(() => {
      this.fetchActivity();
    });
  }

  fetchActivity() {
    this.activityService.getActivity(this.activityId).subscribe(response => {
      this.activity = response;
    });
  }

  formatActivityDuration(activity: ActivityDto) {
    return this.activityService.formatActivityDuration(activity);
  }

  formatActivityDistance(activity: ActivityDto) {
    return this.activityService.formatActivityDistance(activity);
  }
}
