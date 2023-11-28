import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditActivityTypePage } from './edit-activity-type.page';

const routes: Routes = [
  {
    path: '',
    component: EditActivityTypePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditActivityTypePageRoutingModule {}
