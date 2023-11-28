import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditActivityTypePageRoutingModule } from './edit-activity-type-routing.module';

import { EditActivityTypePage } from './edit-activity-type.page';
import {TranslateModule} from "@ngx-translate/core";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        EditActivityTypePageRoutingModule,
        ReactiveFormsModule,
        TranslateModule
    ],
  declarations: [EditActivityTypePage]
})
export class EditActivityTypePageModule {}
