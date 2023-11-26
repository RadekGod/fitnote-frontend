import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GeneralMeasurementsPage } from './general-measurements.page';

const routes: Routes = [
  {
    path: '',
    component: GeneralMeasurementsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GeneralMeasurementsPageRoutingModule {}
