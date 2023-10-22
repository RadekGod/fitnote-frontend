import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddCustomExercisePage } from './add-custom-exercise.page';

const routes: Routes = [
  {
    path: '',
    component: AddCustomExercisePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddCustomExercisePageRoutingModule {}
