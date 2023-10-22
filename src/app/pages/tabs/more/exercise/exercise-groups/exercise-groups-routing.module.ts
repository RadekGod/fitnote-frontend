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
    path: 'exercises/:category',
    loadChildren: () => import('./exercises/exercises.module').then(m => m.ExercisesPageModule)
  },
  {
    path: 'edit-custom-exercise/:id',
    loadChildren: () => import('./edit-custom-exercise/edit-custom-exercise.module').then( m => m.EditCustomExercisePageModule)
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExerciseGroupsPageRoutingModule {}
