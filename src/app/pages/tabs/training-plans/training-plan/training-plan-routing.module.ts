import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TrainingPlanPage } from './training-plan.page';

const routes: Routes = [
  {
    path: '',
    component: TrainingPlanPage
  },
  {
    path: 'exercise-groups',
    loadChildren: () => import('./exercise/exercise-groups/exercise-groups.module').then(m => m.ExerciseGroupsPageModule)
  },
  {
    path: 'add-exercise',
    loadChildren: () => import('./exercise/add-exercise/add-exercise.module').then(m => m.AddExercisePageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TrainingPlanPageRoutingModule {}
