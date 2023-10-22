import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddBodyMeasurementPage } from './add-body-measurement.page';

const routes: Routes = [
  {
    path: '',
    component: AddBodyMeasurementPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddBodyMeasurementPageRoutingModule {}
