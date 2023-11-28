import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ActivityPageRoutingModule } from './activities-routing.module';

import { ActivitiesPage } from './activities.page';
import {TranslateModule} from "@ngx-translate/core";
import {NoDataComponentModule} from "../../../../components/no-data/no-data-module";
import {PipesModule} from "../../../../commons/pipes/pipes-module";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ActivityPageRoutingModule,
    TranslateModule,
    NoDataComponentModule,
    PipesModule
  ],
  declarations: [ActivitiesPage]
})
export class ActivityPageModule {}
