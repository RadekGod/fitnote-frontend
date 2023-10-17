import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable, Subject} from "rxjs";
import {environment} from "../../../../../environments/environment";
import {AppConstants} from "../../../../configuration/app.constants";
import {ExerciseDto} from "../../training-plans/model/exercise-dto.model";

@Injectable({
  providedIn: 'root'
})
export class ExerciseService {

  constructor(private httpClient: HttpClient) {

  }

  public exercisesChange = new Subject<void>();


  notifyAboutExercisesChange(): void {
    this.exercisesChange.next();
  }

  getAllExercisesFromCategory(category: string): Observable<ExerciseDto[]> {
    return this.httpClient.get<ExerciseDto[]>(environment.rootUrl + AppConstants.EXERCISES_CATEGORIES_API_URL, {params: {category: category},  withCredentials:true });
  }

  // getExercise(category: string): Observable<any> {
  //   return this.httpClient.get<any>(environment.rootUrl + AppConstants.EXERCISES_API_URL, {params: {category: category},  withCredentials:true });
  // }

  addCustomExercise(formData: FormData)  {
    return this.httpClient.post(environment.rootUrl + AppConstants.EXERCISES_API_URL, formData,{ withCredentials: true });
  }

}