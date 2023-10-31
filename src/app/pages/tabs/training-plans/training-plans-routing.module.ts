import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TrainingPlansPage } from './training-plans.page';

const routes: Routes = [
  {
    path: '',
    component: TrainingPlansPage
  },
  {
    path: 'add-training-plan',
    loadChildren: () => import('./add-training-plan/add-training-plan.module').then( m => m.AddTrainingPlanPageModule)
  },
  {
    path: 'edit-training-plan/:trainingPlanId',
    loadChildren: () => import('./edit-training-plan/edit-training-plan.module').then( m => m.EditTrainingPlanPageModule)
  },
  {
    path: ':trainingPlanId',
    loadChildren: () => import('./training-plan/training-plan.module').then( m => m.TrainingPlanPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TrainingPlansPageRoutingModule {}
