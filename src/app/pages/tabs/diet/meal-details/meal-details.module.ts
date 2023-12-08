import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MealDetailsPageRoutingModule } from './meal-details-routing.module';

import { MealDetailsPage } from './meal-details.page';
import {NoDataComponentModule} from "../../../../components/no-data/no-data-module";
import {TranslateModule} from "@ngx-translate/core";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        MealDetailsPageRoutingModule,
        NoDataComponentModule,
        TranslateModule
    ],
  declarations: [MealDetailsPage]
})
export class MealDetailsPageModule {}
