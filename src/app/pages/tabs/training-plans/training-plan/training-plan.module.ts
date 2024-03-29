import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TrainingPlanPageRoutingModule } from './training-plan-routing.module';

import { TrainingPlanPage } from './training-plan.page';
import {TranslateModule} from "@ngx-translate/core";
import {BodyPageModule} from "../../body/body.module";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        TrainingPlanPageRoutingModule,
        TranslateModule,
        BodyPageModule
    ],
  declarations: [TrainingPlanPage]
})
export class TrainingPlanPageModule {}
