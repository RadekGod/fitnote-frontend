import { NgModule } from '@angular/core';
import {CommonModule, DatePipe} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddActivityPageRoutingModule } from './add-activity-routing.module';

import { AddActivityPage } from './add-activity.page';
import {TranslateModule} from "@ngx-translate/core";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddActivityPageRoutingModule,
    TranslateModule,
    ReactiveFormsModule
  ],
  declarations: [AddActivityPage],
  providers: [
    DatePipe
  ]
})
export class AddActivityPageModule {}
