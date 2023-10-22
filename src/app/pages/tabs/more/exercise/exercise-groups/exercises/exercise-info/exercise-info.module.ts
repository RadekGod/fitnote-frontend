import { NgModule } from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ExerciseInfoPageRoutingModule } from './exercise-info-routing.module';

import { ExerciseInfoPage } from './exercise-info.page';
import {TranslateModule} from "@ngx-translate/core";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ExerciseInfoPageRoutingModule,
    NgOptimizedImage,
    TranslateModule
  ],
  declarations: [ExerciseInfoPage]
})
export class ExerciseInfoPageModule {}
