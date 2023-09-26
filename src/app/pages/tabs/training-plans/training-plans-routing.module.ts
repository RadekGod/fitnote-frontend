import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TrainingPlansPage } from './training-plans.page';

const routes: Routes = [
  {
    path: '',
    component: TrainingPlansPage
  },
  {
    path: 'training-plan',
    loadChildren: () => import('./training-plan/training-plan.module').then( m => m.TrainingPlanPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TrainingPlansPageRoutingModule {}
