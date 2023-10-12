import { Injectable } from '@angular/core';
import {Observable, Subject} from "rxjs";
import {GeneralMeasurementDto} from "../body/model/general-measurement-dto.model";
import {environment} from "../../../../environments/environment";
import {AppConstants} from "../../../configuration/app.constants";
import {HttpClient} from "@angular/common/http";
import {TrainingPlanDto} from "./model/training-plan-dto.model";

@Injectable({
  providedIn: 'root'
})
export class TrainingPlanService {

  public trainingPlanChange = new Subject<void>();
  trainingPlans: GeneralMeasurementDto | null = null;

  constructor(private httpClient: HttpClient) { }



  notifyAboutTrainingPlanChange(): void {
    this.trainingPlanChange.next();
  }

  getAllTrainingPlans(): Observable<TrainingPlanDto[]> {
    return this.httpClient.get<TrainingPlanDto[]>(environment.rootUrl + AppConstants.TRAINING_PLANS_API_URL, { withCredentials:true });
  }

  getTrainingPlan(): Observable<GeneralMeasurementDto> {
    return this.httpClient.get<GeneralMeasurementDto>(environment.rootUrl + AppConstants.GENERAL_MEASUREMENTS_API_URL + '/latest', { withCredentials:true });
  }
}
