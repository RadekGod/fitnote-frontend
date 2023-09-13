import { NgModule } from '@angular/core';
import {CommonModule, DatePipe} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditBodyMeasurementPageRoutingModule } from './edit-body-measurement-routing.module';

import { EditBodyMeasurementPage } from './edit-body-measurement.page';
import {TranslateModule} from "@ngx-translate/core";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        EditBodyMeasurementPageRoutingModule,
        ReactiveFormsModule,
        TranslateModule
    ],
  providers: [
    DatePipe
  ],
  declarations: [EditBodyMeasurementPage]
})
export class EditBodyMeasurementPageModule {}
