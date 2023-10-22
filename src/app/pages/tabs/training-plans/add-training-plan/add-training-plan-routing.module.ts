import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddTrainingPlanPage } from './add-training-plan.page';

const routes: Routes = [
  {
    path: '',
    component: AddTrainingPlanPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddTrainingPlanPageRoutingModule {}
