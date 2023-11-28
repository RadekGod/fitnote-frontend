import { NgModule } from '@angular/core';
import {CommonModule, DatePipe, DecimalPipe} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditActivityPageRoutingModule } from './edit-activity-routing.module';

import { EditActivityPage } from './edit-activity.page';
import {TranslateModule} from "@ngx-translate/core";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        EditActivityPageRoutingModule,
        ReactiveFormsModule,
        TranslateModule
    ],
  declarations: [EditActivityPage],
  providers: [DatePipe]
})
export class EditActivityPageModule {}
