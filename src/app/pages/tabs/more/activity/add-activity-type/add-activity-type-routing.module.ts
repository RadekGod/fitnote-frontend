import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddActivityTypePage } from './add-activity-type.page';

const routes: Routes = [
  {
    path: '',
    component: AddActivityTypePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddActivityTypePageRoutingModule {}
