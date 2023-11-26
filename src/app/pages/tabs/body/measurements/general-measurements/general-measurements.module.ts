import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GeneralMeasurementsPageRoutingModule } from './general-measurements-routing.module';

import { GeneralMeasurementsPage } from './general-measurements.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GeneralMeasurementsPageRoutingModule
  ],
  declarations: [GeneralMeasurementsPage]
})
export class GeneralMeasurementsPageModule {}
