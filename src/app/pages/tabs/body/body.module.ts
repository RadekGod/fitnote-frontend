import { NgModule } from '@angular/core';
import {CommonModule, DecimalPipe} from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BodyPageRoutingModule } from './body-routing.module';

import { BodyPage } from './body.page';
import {NoDataComponent} from "../../../components/no-data/no-data.component";
import {TranslateModule} from "@ngx-translate/core";
import {RemoveCommaPipe} from "../../../commons/pipes/remove-comma.pipe";
import {AppModule} from "../../../app.module";
import {PipesModule} from "../../../commons/pipes/pipes-module";
import {NoDataComponentModule} from "../../../components/no-data/no-data-module";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BodyPageRoutingModule,
    TranslateModule,
    PipesModule,
    NoDataComponentModule,

  ],
  declarations: [BodyPage],
  providers: [
    DecimalPipe
  ]
})
export class BodyPageModule {}
