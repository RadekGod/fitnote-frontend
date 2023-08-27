import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddGeneralMeasurementsPage } from './add-general-measurements.page';

const routes: Routes = [
  {
    path: '',
    component: AddGeneralMeasurementsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddGeneralMeasurementsPageRoutingModule {}
