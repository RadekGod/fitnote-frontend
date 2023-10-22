import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditTrainingPlanPage } from './edit-training-plan.page';

const routes: Routes = [
  {
    path: '',
    component: EditTrainingPlanPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditTrainingPlanPageRoutingModule {}
