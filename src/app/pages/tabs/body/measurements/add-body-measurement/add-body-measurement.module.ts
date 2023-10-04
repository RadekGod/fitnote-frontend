import { NgModule } from '@angular/core';
import {CommonModule, DatePipe} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddBodyMeasurementPageRoutingModule } from './add-body-measurement-routing.module';

import { AddBodyMeasurementPage } from './add-body-measurement.page';
import {TranslateModule} from "@ngx-translate/core";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        AddBodyMeasurementPageRoutingModule,
        ReactiveFormsModule,
        TranslateModule
    ],
  providers: [
    DatePipe
    ],
  declarations: [AddBodyMeasurementPage]
})
export class AddBodyMeasurementPageModule {}
