import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {ActivatedRoute} from "@angular/router";
import {MealDto} from "../model/activity-dto.model";
import {MealService} from "../meal.service";

@Component({
  selector: 'app-meal-details',
  templateUrl: './meal-details.page.html',
  styleUrls: ['./meal-details.page.scss'],
})
export class MealDetailsPage implements OnInit, OnDestroy {

  meal: MealDto | null = null;
  mealId = Number(this.route.snapshot.paramMap.get('mealId'));
  private mealSubscription!: Subscription;

  constructor(private mealService: MealService,
              private route: ActivatedRoute) { }

  async ngOnInit() {
    this.initializeMeal();
  }

  initializeMeal() {
    this.fetchMeal();
    this.mealSubscription = this.listenForMealsChange();
  }

  listenForMealsChange() {
    return this.mealService.mealsChange.subscribe(() => {
      this.fetchMeal();
    });
  }

  fetchMeal() {
    this.mealService.getMeal(this.mealId).subscribe(response => {
      this.meal = response;
    });
  }

  ngOnDestroy(): void {
    this.mealSubscription.unsubscribe();
  }
}
