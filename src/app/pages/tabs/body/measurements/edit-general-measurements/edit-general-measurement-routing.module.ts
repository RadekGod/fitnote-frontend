import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditGeneralMeasurementPage } from './edit-general-measurement-page.component';

const routes: Routes = [
  {
    path: '',
    component: EditGeneralMeasurementPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditGeneralMeasurementPageRoutingModule {}
