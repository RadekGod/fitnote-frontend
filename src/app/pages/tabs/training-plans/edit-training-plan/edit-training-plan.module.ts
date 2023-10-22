import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditTrainingPlanPageRoutingModule } from './edit-training-plan-routing.module';

import { EditTrainingPlanPage } from './edit-training-plan.page';
import {TranslateModule} from "@ngx-translate/core";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        EditTrainingPlanPageRoutingModule,
        ReactiveFormsModule,
        TranslateModule
    ],
  declarations: [EditTrainingPlanPage]
})
export class EditTrainingPlanPageModule {}
