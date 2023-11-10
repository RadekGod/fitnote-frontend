import {Injectable} from '@angular/core';
import {environment} from "../../../../../environments/environment";
import {AppConstants} from "../../../../configuration/app.constants";
import {HttpClient} from "@angular/common/http";
import {TrainingDto} from "./training/model/training-dto.model";
import {Observable, Subject} from "rxjs";
import {TrainingPlanDto} from "../model/training-plan-dto.model";

@Injectable({
  providedIn: 'root'
})
export class TrainingService {

  public trainingChange = new Subject<void>();

  constructor(private httpClient: HttpClient) { }

  notifyAboutTrainingsChange(): void {
    this.trainingChange.next();
  }

  createTraining(trainingDto: TrainingDto) {
    return this.httpClient.post(environment.rootUrl + AppConstants.TRAININGS_API_URL, trainingDto,{ withCredentials:true });
  }

  getAllTrainings(): Observable<TrainingDto[]> {
    return this.httpClient.get<TrainingDto[]>(environment.rootUrl + AppConstants.TRAININGS_API_URL, { withCredentials:true });
  }

  getTraining(trainingId: number): Observable<TrainingDto> {
    return this.httpClient.get<TrainingDto>(environment.rootUrl + AppConstants.TRAININGS_API_URL + `/${trainingId}`, { withCredentials:true });
  }
}
