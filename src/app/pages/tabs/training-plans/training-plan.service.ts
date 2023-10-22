import { Injectable } from '@angular/core';
import {Observable, Subject} from "rxjs";
import {GeneralMeasurementDto} from "../body/model/general-measurement-dto.model";
import {environment} from "../../../../environments/environment";
import {AppConstants} from "../../../configuration/app.constants";
import {HttpClient} from "@angular/common/http";
import {TrainingPlanDto} from "./model/training-plan-dto.model";
import {TrainingPlanExerciseDto} from "./model/training-plan-exercise-dto.model";
import {FormGroup} from "@angular/forms";

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

  createTrainingPlan(trainingPlanDto: TrainingPlanDto) {
    return this.httpClient.post(environment.rootUrl + AppConstants.TRAINING_PLANS_API_URL, trainingPlanDto,{ withCredentials:true });
  }

  updateTrainingPlan(trainingPlanId: number, trainingPlanDto: TrainingPlanDto): Observable<void> {
    return this.httpClient.put<void>(environment.rootUrl + AppConstants.TRAINING_PLANS_API_URL + `/${trainingPlanId}`, trainingPlanDto,{ withCredentials:true });
  }

  getTrainingPlan(trainingPlanId: number): Observable<TrainingPlanDto> {
    return this.httpClient.get<TrainingPlanDto>(environment.rootUrl + AppConstants.TRAINING_PLANS_API_URL + `/${trainingPlanId}`, { withCredentials:true });
  }

  getAllTrainingPlans(): Observable<TrainingPlanDto[]> {
    return this.httpClient.get<TrainingPlanDto[]>(environment.rootUrl + AppConstants.TRAINING_PLANS_API_URL, { withCredentials:true });
  }

  deleteTrainingPlan(trainingPlanId: number): Observable<void> {
    return this.httpClient.delete<void>(environment.rootUrl + AppConstants.TRAINING_PLANS_API_URL + `/${trainingPlanId}`, { withCredentials:true });
  }

  deleteExerciseFromTrainingPlan(trainingPlanId: number, trainingPlanExerciseId: number): Observable<void> {
    return this.httpClient.delete<void>(environment.rootUrl + AppConstants.TRAINING_PLANS_API_URL + `/${trainingPlanId}/exercises`, {params: {trainingPlanExerciseId: trainingPlanExerciseId},  withCredentials:true });
  }


  getAllExercisesFromTrainingPlan(trainingPlanId: number): Observable<TrainingPlanExerciseDto[]> {
    return this.httpClient.get<TrainingPlanExerciseDto[]>(environment.rootUrl + AppConstants.TRAINING_PLANS_API_URL + `/${trainingPlanId}/exercises`, { withCredentials:true });
  }
}
