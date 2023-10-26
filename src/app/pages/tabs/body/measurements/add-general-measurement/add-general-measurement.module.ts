import { NgModule } from '@angular/core';
import {CommonModule, DatePipe} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddGeneralMeasurementPageRoutingModule } from './add-general-measurement-routing.module';

import { AddGeneralMeasurementPage } from './add-general-measurement-page';
import {TranslateModule} from "@ngx-translate/core";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        AddGeneralMeasurementPageRoutingModule,
        ReactiveFormsModule,
        TranslateModule
    ],
  providers: [
  DatePipe
  ],
  declarations: [AddGeneralMeasurementPage]
})
export class AddGeneralMeasurementPageModule {}
