import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditTrainingPlanExercisePage } from './edit-training-plan-exercise-page.component';

const routes: Routes = [
  {
    path: '',
    component: EditTrainingPlanExercisePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditExerciseInTrainingPlanPageRoutingModule {}
