import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BodyPage } from './body.page';
import {TabsPage} from "../tabs.page";
import {userRoleGuard} from "../../../services/auth/fit-note-auth-guard.service";
import {FitNoteUserRole} from "../../../commons/models/user-roles";

const routes: Routes = [
  {
    path: '',
    component: BodyPage
  },
  {
    path: 'add-general-measurements',
    loadChildren: () => import('./add-general-measurements/add-general-measurements.module').then( m => m.AddGeneralMeasurementsPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BodyPageRoutingModule {}
