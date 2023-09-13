import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {BodyPage} from './body.page';

const routes: Routes = [
  {
    path: '',
    component: BodyPage
  },
  {
    path: 'add-general-measurement',
    loadChildren: () => import('./add-general-measurement/add-general-measurement.module').then(m => m.AddGeneralMeasurementPageModule)
  },
  {
    path: 'edit-general-measurement/:id',
    loadChildren: () => import('./edit-general-measurements/edit-general-measurement.module').then(m => m.EditGeneralMeasurementPageModule)
  },
  {
    path: 'add-body-measurement',
    loadChildren: () => import('./add-body-measurement/add-body-measurement.module').then( m => m.AddBodyMeasurementPageModule)
  },
  {
    path: 'edit-body-measurement/:id',
    loadChildren: () => import('./edit-body-measurement/edit-body-measurement.module').then( m => m.EditBodyMeasurementPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BodyPageRoutingModule {}
