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

  calculateTrainingDuration(training: TrainingDto) {
    let startTime = new Date(training.startTime!).getTime();
    let finishTime = new Date(training.finishTime!).getTime();
    let timeDifferenceInMinutes = Math.floor((finishTime - startTime) / (1000 * 60));
    return Math.floor(timeDifferenceInMinutes / 60) + 'h ' + (timeDifferenceInMinutes % 60) + 'min';
  }

  notifyAboutTrainingsChange(): void {
    this.trainingChange.next();
  }

  createTraining(trainingDto: TrainingDto): Observable<number> {
    return this.httpClient.post<number>(environment.rootUrl + AppConstants.TRAININGS_API_URL, trainingDto,{ withCredentials:true });
  }

  getAllTrainings(): Observable<TrainingDto[]> {
    return this.httpClient.get<TrainingDto[]>(environment.rootUrl + AppConstants.TRAININGS_API_URL, { withCredentials:true });
  }

  getTraining(trainingId: number): Observable<TrainingDto> {
    return this.httpClient.get<TrainingDto>(environment.rootUrl + AppConstants.TRAININGS_API_URL + `/${trainingId}`, { withCredentials:true });
  }

  deleteTraining(trainingId: number): Observable<TrainingDto> {
    return this.httpClient.delete<TrainingDto>(environment.rootUrl + AppConstants.TRAININGS_API_URL + `/${trainingId}`, { withCredentials:true });
  }
}
