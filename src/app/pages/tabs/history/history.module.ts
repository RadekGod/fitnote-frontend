import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HistoryPageRoutingModule } from './history-routing.module';

import { HistoryPage } from './history.page';
import {BodyPageModule} from "../body/body.module";
import {TranslateModule} from "@ngx-translate/core";
import {NoDataComponentModule} from "../../../components/no-data/no-data-module";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HistoryPageRoutingModule,
    BodyPageModule,
    TranslateModule,
    NoDataComponentModule
  ],
  declarations: [HistoryPage]
})
export class HistoryPageModule {}
