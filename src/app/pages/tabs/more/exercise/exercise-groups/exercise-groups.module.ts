import { NgModule } from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ExerciseGroupsPageRoutingModule } from './exercise-groups-routing.module';

import { ExerciseGroupsPage } from './exercise-groups.page';
import {TranslateModule} from "@ngx-translate/core";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        ExerciseGroupsPageRoutingModule,
        NgOptimizedImage,
        TranslateModule
    ],
  declarations: [ExerciseGroupsPage]
})
export class ExerciseGroupsPageModule {}
