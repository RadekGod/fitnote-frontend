import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DietPageRoutingModule } from './diet-routing.module';

import { DietPage } from './diet.page';
import {NoDataComponentModule} from "../../../components/no-data/no-data-module";
import {TranslateModule} from "@ngx-translate/core";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        DietPageRoutingModule,
        NoDataComponentModule,
        TranslateModule
    ],
  declarations: [DietPage]
})
export class DietPageModule {}
