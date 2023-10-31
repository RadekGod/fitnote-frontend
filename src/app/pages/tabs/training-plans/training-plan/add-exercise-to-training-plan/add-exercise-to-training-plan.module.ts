import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddExerciseToTrainingPlanPageRoutingModule } from './add-exercise-to-training-plan-routing.module';

import { AddExerciseToTrainingPlanPage } from './add-exercise-to-training-plan.page';
import {TranslateModule} from "@ngx-translate/core";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddExerciseToTrainingPlanPageRoutingModule,
    TranslateModule,
    ReactiveFormsModule
  ],
  declarations: [AddExerciseToTrainingPlanPage]
})
export class AddExerciseToTrainingPlanPageModule {}
