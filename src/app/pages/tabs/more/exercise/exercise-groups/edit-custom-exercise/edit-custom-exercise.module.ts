import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditCustomExercisePageRoutingModule } from './edit-custom-exercise-routing.module';

import { EditCustomExercisePage } from './edit-custom-exercise.page';
import {TranslateModule} from "@ngx-translate/core";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditCustomExercisePageRoutingModule,
    TranslateModule,
    ReactiveFormsModule
  ],
  declarations: [EditCustomExercisePage]
})
export class EditCustomExercisePageModule {}
