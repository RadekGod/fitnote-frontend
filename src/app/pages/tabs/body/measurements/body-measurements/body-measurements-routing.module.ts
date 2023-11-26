import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BodyMeasurementsPage } from './body-measurements.page';

const routes: Routes = [
  {
    path: '',
    component: BodyMeasurementsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BodyMeasurementsPageRoutingModule {}
