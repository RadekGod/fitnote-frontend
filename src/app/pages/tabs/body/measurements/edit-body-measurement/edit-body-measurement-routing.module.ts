import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditBodyMeasurementPage } from './edit-body-measurement.page';

const routes: Routes = [
  {
    path: '',
    component: EditBodyMeasurementPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditBodyMeasurementPageRoutingModule {}
