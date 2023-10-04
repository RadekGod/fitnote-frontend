import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddGeneralMeasurementPage } from './add-general-measurement-page.component';

const routes: Routes = [
  {
    path: '',
    component: AddGeneralMeasurementPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddGeneralMeasurementPageRoutingModule {}
