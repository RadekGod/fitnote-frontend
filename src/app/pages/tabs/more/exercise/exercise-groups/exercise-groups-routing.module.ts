import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ExerciseGroupsPage } from './exercise-groups.page';

const routes: Routes = [
  {
    path: '',
    component: ExerciseGroupsPage
  },
  {
    path: 'add-custom-exercise',
    loadChildren: () => import('./add-custom-exercise/add-custom-exercise.module').then(m => m.AddCustomExercisePageModule)
  },
  {
    path: 'exercises',
    loadChildren: () => import('./exercises/exercises.module').then(m => m.ExercisesPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ExerciseGroupsPageRoutingModule {}
