import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ExercisesPage } from './exercises.page';

const routes: Routes = [
  {
    path: '',
    component: ExercisesPage
  },
  {
    path: 'exercise/:id',
    loadChildren: () => import('./exercise-info/exercise-info.module').then(m => m.ExerciseInfoPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ExercisesPageRoutingModule {}
