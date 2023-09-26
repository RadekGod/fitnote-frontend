import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ExercisesPage } from './exercises.page';

const routes: Routes = [
  {
    path: '',
    component: ExercisesPage
  },
  {
    path: 'add-custom-exercise',
    loadChildren: () => import('../add-custom-exercise/add-custom-exercise.module').then(m => m.AddCustomExercisePageModule)
  },
  {
    path: 'exercise',
    loadChildren: () => import('./exercise-info/exercise-info.module').then(m => m.ExerciseInfoPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ExercisesPageRoutingModule {}
