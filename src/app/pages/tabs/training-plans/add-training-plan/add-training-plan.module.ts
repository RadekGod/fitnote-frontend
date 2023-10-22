import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddTrainingPlanPageRoutingModule } from './add-training-plan-routing.module';

import { AddTrainingPlanPage } from './add-training-plan.page';
import {TranslateModule} from "@ngx-translate/core";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddTrainingPlanPageRoutingModule,
    TranslateModule,
    ReactiveFormsModule
  ],
  declarations: [AddTrainingPlanPage]
})
export class AddTrainingPlanPageModule {}
