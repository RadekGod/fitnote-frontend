import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddCustomExercisePageRoutingModule } from './add-custom-exercise-routing.module';

import { AddCustomExercisePage } from './add-custom-exercise.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddCustomExercisePageRoutingModule
  ],
  declarations: [AddCustomExercisePage]
})
export class AddCustomExercisePageModule {}
