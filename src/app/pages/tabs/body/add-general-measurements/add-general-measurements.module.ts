import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddGeneralMeasurementsPageRoutingModule } from './add-general-measurements-routing.module';

import { AddGeneralMeasurementsPage } from './add-general-measurements.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddGeneralMeasurementsPageRoutingModule
  ],
  declarations: [AddGeneralMeasurementsPage]
})
export class AddGeneralMeasurementsPageModule {}
