import { Component, OnInit } from '@angular/core';
import {ActivityDto} from "../more/activity/model/activity-dto.model";
import {ActivityTypeDto} from "../more/activity/model/activity-type-dto.model";
import {Subscription} from "rxjs";
import {Router} from "@angular/router";
import {ActivityService} from "../more/activity/activity.service";
import {ToastService} from "../../../commons/services/toast/toast.service";
import {MealDto} from "./model/activity-dto.model";
import {MealService} from "./meal.service";

@Component({
  selector: 'app-diet',
  templateUrl: './diet.page.html',
  styleUrls: ['./diet.page.scss'],
})
export class DietPage implements OnInit {

  meals: MealDto[] | null = null;
  consumedCalories: number = 0;
  private mealsSubscription!: Subscription;

  constructor(private router: Router,
              private mealService: MealService,
              private toastService: ToastService) { }

  async ngOnInit() {
    this.initializeMeals();
  }

  initializeMeals() {
    this.fetchMeals();
    this.mealsSubscription = this.listenForMealsChange();
  }

  listenForMealsChange() {
    return this.mealService.mealsChange.subscribe(() => {
      this.fetchMeals();
    });
  }

  fetchMeals() {
    this.mealService.getAllMeals().subscribe(response => {
      this.meals = response;
      this.sumAllMealsCalories();
    });
  }

  sumAllMealsCalories() {
    this.consumedCalories = 0;
    this.meals?.forEach(meal => {
      this.consumedCalories += meal.kilocalories;
    })
  }

  deleteMeal(meal: MealDto) {
    this.mealService.deleteMeal(meal.id).subscribe( async () => {
      this.mealService.notifyAboutMealsChange();
      await this.toastService.presentToast('success', 'TOAST_MESSAGES.MEAL_DELETE_SUCCESS');
    }, async () => {
      await this.toastService.presentToast('error', 'TOAST_MESSAGES.MEAL_DELETE_ERROR');
    });
  }
}
