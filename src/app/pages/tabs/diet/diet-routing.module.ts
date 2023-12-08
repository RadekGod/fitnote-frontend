import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DietPage } from './diet.page';

const routes: Routes = [
  {
    path: '',
    component: DietPage
  },
  {
    path: 'add-meal',
    loadChildren: () => import('./add-meal/add-meal.module').then( m => m.AddMealPageModule)
  },
  {
    path: 'edit-meal/:mealId',
    loadChildren: () => import('./edit-meal/edit-meal.module').then( m => m.EditMealPageModule)
  },
  {
    path: 'meals/:mealId',
    loadChildren: () => import('./meal-details/meal-details.module').then( m => m.MealDetailsPageModule)
  }


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DietPageRoutingModule {}
