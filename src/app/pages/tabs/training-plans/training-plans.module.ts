import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TrainingPlansPageRoutingModule } from './training-plans-routing.module';

import { TrainingPlansPage } from './training-plans.page';
import {TranslateModule} from "@ngx-translate/core";
import {BodyPageModule} from "../body/body.module";
import {NoDataComponentModule} from "../../../components/no-data/no-data-module";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TrainingPlansPageRoutingModule,
    TranslateModule,
    BodyPageModule,
    NoDataComponentModule
  ],
  declarations: [TrainingPlansPage]
})
export class TrainingPlansPageModule {}
