import { NgModule } from '@angular/core';
import {CommonModule, DecimalPipe} from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BodyPageRoutingModule } from './body-routing.module';

import { BodyPage } from './body.page';
import {NoDataComponent} from "../../../components/no-data/no-data.component";
import {TranslateModule} from "@ngx-translate/core";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BodyPageRoutingModule,
    TranslateModule
  ],
  declarations: [BodyPage, NoDataComponent],
  exports: [
    NoDataComponent
  ],
  providers: [
    DecimalPipe
  ]
})
export class BodyPageModule {}
