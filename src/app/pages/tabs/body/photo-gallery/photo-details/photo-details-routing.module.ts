import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PhotoDetailsPage } from './photo-details.page';

const routes: Routes = [
  {
    path: '',
    component: PhotoDetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PhotoDetailsPageRoutingModule {}
