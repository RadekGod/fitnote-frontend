import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddExerciseToTrainingPlanPage } from './add-exercise-to-training-plan.page';

const routes: Routes = [
  {
    path: '',
    component: AddExerciseToTrainingPlanPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddExerciseToTrainingPlanPageRoutingModule {}
