import { Injectable } from '@angular/core';
import {Observable, Subject} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {ActivityDto} from "../more/activity/model/activity-dto.model";
import {environment} from "../../../../environments/environment";
import {AppConstants} from "../../../configuration/app.constants";
import {ActivityTypeDto} from "../more/activity/model/activity-type-dto.model";
import {MealDto} from "./model/activity-dto.model";

@Injectable({
  providedIn: 'root'
})
export class MealService {

  public mealsChange = new Subject<void>();
  constructor(private httpClient: HttpClient) { }

  notifyAboutMealsChange(): void {
    this.mealsChange.next();
  }

  addMeal(mealDto: MealDto): Observable<number> {
    return this.httpClient.post<number>(environment.rootUrl + AppConstants.MEALS_API_URL, mealDto,{ withCredentials: true });
  }

  getAllMeals(): Observable<MealDto[]> {
    return this.httpClient.get<MealDto[]>(environment.rootUrl + AppConstants.MEALS_API_URL, { withCredentials:true });
  }
  getMeal(mealId: number): Observable<MealDto> {
    return this.httpClient.get<MealDto>(environment.rootUrl + AppConstants.MEALS_API_URL + `/${mealId}`, { withCredentials:true });
  }

  editMeal(mealId: number, mealDto: MealDto): Observable<any> {
    mealDto.id = mealId;
    return this.httpClient.put<void>(environment.rootUrl + AppConstants.MEALS_API_URL + `/${mealId}`, mealDto);
  }

  deleteMeal(mealId: number): Observable<void> {
    return this.httpClient.delete<void>(environment.rootUrl + AppConstants.MEALS_API_URL + `/${mealId}`, { withCredentials:true });
  }
}
