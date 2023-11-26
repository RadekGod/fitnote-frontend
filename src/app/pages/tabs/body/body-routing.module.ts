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
    loadChildren: () => import('./measurements/add-general-measurement/add-general-measurement.module').then(m => m.AddGeneralMeasurementPageModule)
  },
  {
    path: 'edit-general-measurement/:id',
    loadChildren: () => import('./measurements/edit-general-measurement/edit-general-measurement.module').then(m => m.EditGeneralMeasurementPageModule)
  },
  {
    path: 'add-body-measurement',
    loadChildren: () => import('./measurements/add-body-measurement/add-body-measurement.module').then(m => m.AddBodyMeasurementPageModule)
  },
  {
    path: 'edit-body-measurement/:id',
    loadChildren: () => import('./measurements/edit-body-measurement/edit-body-measurement.module').then(m => m.EditBodyMeasurementPageModule)
  },
  {
    path: 'add-photo',
    loadChildren: () => import('./photo-gallery/add-photo/add-photo.module').then(m => m.AddPhotoPageModule)
  },
  {
    path: 'photo-details/:id',
    loadChildren: () => import('./photo-gallery/photo-details/photo-details.module').then(m => m.PhotoDetailsPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BodyPageRoutingModule {}
