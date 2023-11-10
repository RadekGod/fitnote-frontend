import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditExerciseInTrainingPlanPageRoutingModule } from './edit-training-plan-exercise-routing.module';

import { EditTrainingPlanExercisePage } from './edit-training-plan-exercise.page';
import {TranslateModule} from "@ngx-translate/core";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditExerciseInTrainingPlanPageRoutingModule,
    TranslateModule,
    ReactiveFormsModule
  ],
  declarations: [EditTrainingPlanExercisePage]
})
export class EditExerciseInTrainingPlanPageModule {}
