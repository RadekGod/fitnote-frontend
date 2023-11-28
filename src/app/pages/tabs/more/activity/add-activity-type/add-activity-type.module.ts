import { NgModule } from '@angular/core';
import {CommonModule, DatePipe} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddActivityTypePageRoutingModule } from './add-activity-type-routing.module';

import { AddActivityTypePage } from './add-activity-type.page';
import {TranslateModule} from "@ngx-translate/core";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        AddActivityTypePageRoutingModule,
        ReactiveFormsModule,
        TranslateModule
    ],
  declarations: [AddActivityTypePage],
  providers: [DatePipe]
})
export class AddActivityTypePageModule {}
