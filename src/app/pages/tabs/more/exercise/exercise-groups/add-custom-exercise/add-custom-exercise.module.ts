import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddCustomExercisePageRoutingModule } from './add-custom-exercise-routing.module';

import { AddCustomExercisePage } from './add-custom-exercise.page';
import {TranslateModule} from "@ngx-translate/core";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        AddCustomExercisePageRoutingModule,
        TranslateModule,
        ReactiveFormsModule
    ],
  declarations: [AddCustomExercisePage]
})
export class AddCustomExercisePageModule {}
