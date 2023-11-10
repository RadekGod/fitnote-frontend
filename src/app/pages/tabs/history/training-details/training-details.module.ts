import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TrainingDetailsPageRoutingModule } from './training-details-routing.module';

import { TrainingDetailsPage } from './training-details.page';
import {TranslateModule} from "@ngx-translate/core";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        TrainingDetailsPageRoutingModule,
        TranslateModule
    ],
  declarations: [TrainingDetailsPage]
})
export class TrainingDetailsPageModule {}
