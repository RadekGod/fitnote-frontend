import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GeneralMeasurementsPageRoutingModule } from './general-measurements-routing.module';

import { GeneralMeasurementsPage } from './general-measurements.page';
import {NoDataComponentModule} from "../../../../../components/no-data/no-data-module";
import {PipesModule} from "../../../../../commons/pipes/pipes-module";
import {TranslateModule} from "@ngx-translate/core";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GeneralMeasurementsPageRoutingModule,
    NoDataComponentModule,
    PipesModule,
    TranslateModule
  ],
  declarations: [GeneralMeasurementsPage]
})
export class GeneralMeasurementsPageModule {}
