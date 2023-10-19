import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditCustomExercisePage } from './edit-custom-exercise.page';

const routes: Routes = [
  {
    path: '',
    component: EditCustomExercisePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditCustomExercisePageRoutingModule {}
