import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BodyMeasurementsPageRoutingModule } from './body-measurements-routing.module';

import { BodyMeasurementsPage } from './body-measurements.page';
import {TranslateModule} from "@ngx-translate/core";
import {NoDataComponentModule} from "../../../../../components/no-data/no-data-module";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BodyMeasurementsPageRoutingModule,
    TranslateModule,
    NoDataComponentModule
  ],
  declarations: [BodyMeasurementsPage]
})
export class BodyMeasurementsPageModule {}
