import { Injectable } from '@angular/core';
import {Observable, Subject} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {BodyMeasurementDto} from "../../body/model/body-measurement-dto.model";
import {environment} from "../../../../../environments/environment";
import {AppConstants} from "../../../../configuration/app.constants";
import {ActivityDto} from "./model/activity-dto.model";
import {TrainingDto} from "../../training-plans/training-plan/training/model/training-dto.model";
import {FormGroup} from "@angular/forms";
import {GeneralMeasurementDto} from "../../body/model/general-measurement-dto.model";
import {ActivityTypeDto} from "./model/activity-type-dto.model";

@Injectable({
  providedIn: 'root'
})
export class ActivityService {

  public activitiesChange = new Subject<void>();
  public activityTypesChange = new Subject<void>();
  constructor(private httpClient: HttpClient) { }

  notifyAboutActivitiesChange(): void {
    this.activitiesChange.next();
  }

  notifyAboutActivityTypesChange(): void {
    this.activityTypesChange.next();
  }

  formatActivityDuration(activity: ActivityDto) {
    return Math.floor(activity.activityDurationInMinutes / 60) + 'h ' + (activity.activityDurationInMinutes % 60) + 'min';
  }

  formatActivityDistance(activity: ActivityDto) {
    return activity.distanceTraveled / 1000 + 'km';
  }

  addActivity(activityDto: ActivityDto): Observable<number> {
    return this.httpClient.post<number>(environment.rootUrl + AppConstants.ACTIVITIES_API_URL, activityDto,{ withCredentials: true });
  }

  getAllActivities(): Observable<ActivityDto[]> {
    return this.httpClient.get<ActivityDto[]>(environment.rootUrl + AppConstants.ACTIVITIES_API_URL, { withCredentials:true });
  }
  getActivity(activityId: number): Observable<ActivityDto> {
    return this.httpClient.get<ActivityDto>(environment.rootUrl + AppConstants.ACTIVITIES_API_URL + `/${activityId}`, { withCredentials:true });
  }

  editActivity(activityId: number, activityDto: ActivityDto): Observable<any> {
    activityDto.id = activityId;
    return this.httpClient.put<void>(environment.rootUrl + AppConstants.ACTIVITIES_API_URL + `/${activityId}`, activityDto);
  }

  deleteActivity(activityId: number): Observable<void> {
    return this.httpClient.delete<void>(environment.rootUrl + AppConstants.ACTIVITIES_API_URL + `/${activityId}`, { withCredentials:true });
  }

  addActivityType(activityTypeDto: ActivityTypeDto): Observable<number> {
    return this.httpClient.post<number>(environment.rootUrl + AppConstants.ACTIVITY_TYPES_API_URL, activityTypeDto,{ withCredentials: true });
  }

  getAllActivityTypes(): Observable<ActivityTypeDto[]> {
    return this.httpClient.get<ActivityTypeDto[]>(environment.rootUrl + AppConstants.ACTIVITY_TYPES_API_URL, { withCredentials:true });
  }

  getActivityType(activityTypeId: number): Observable<ActivityDto> {
    return this.httpClient.get<ActivityDto>(environment.rootUrl + AppConstants.ACTIVITY_TYPES_API_URL + `/${activityTypeId}`, { withCredentials:true });
  }

  editActivityType(activityTypeId: number, activityTypeDto: ActivityTypeDto): Observable<any> {
    activityTypeDto.id = activityTypeId;
    return this.httpClient.put<void>(environment.rootUrl + AppConstants.ACTIVITY_TYPES_API_URL + `/${activityTypeId}`, activityTypeDto);
  }

  deleteActivityType(activityTypeId: number): Observable<void> {
    return this.httpClient.delete<void>(environment.rootUrl + AppConstants.ACTIVITY_TYPES_API_URL + `/${activityTypeId}`, { withCredentials:true });
  }
}
