import { NgModule } from '@angular/core';
import {CommonModule, DatePipe} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditGeneralMeasurementPageRoutingModule } from './edit-general-measurement-routing.module';

import { EditGeneralMeasurementPage } from './edit-general-measurement-page.component';
import {TranslateModule} from "@ngx-translate/core";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        EditGeneralMeasurementPageRoutingModule,
        ReactiveFormsModule,
        TranslateModule
    ],
  providers: [
    DatePipe
  ],
  declarations: [EditGeneralMeasurementPage]
})
export class EditGeneralMeasurementPageModule {}
