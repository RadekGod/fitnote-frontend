import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ActivityDetailsPageRoutingModule } from './activity-details-routing.module';

import { ActivityDetailsPage } from './activity-details.page';
import {NoDataComponentModule} from "../../../../../components/no-data/no-data-module";
import {PipesModule} from "../../../../../commons/pipes/pipes-module";
import {TranslateModule} from "@ngx-translate/core";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        ActivityDetailsPageRoutingModule,
        NoDataComponentModule,
        PipesModule,
        TranslateModule
    ],
  declarations: [ActivityDetailsPage]
})
export class ActivityDetailsPageModule {}
