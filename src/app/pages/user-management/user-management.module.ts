import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {IonicModule} from '@ionic/angular';

import {UserManagementPageRoutingModule} from './user-management-routing.module';

import {UserManagementPage} from './user-management.page';
import {TranslateModule} from "@ngx-translate/core";

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    IonicModule,
    UserManagementPageRoutingModule,
    TranslateModule
  ],
  declarations: [UserManagementPage]
})
export class UserManagementPageModule {
}
