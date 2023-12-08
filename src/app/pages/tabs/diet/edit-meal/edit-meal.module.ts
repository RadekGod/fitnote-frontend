import { NgModule } from '@angular/core';
import {CommonModule, DatePipe} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditMealPageRoutingModule } from './edit-meal-routing.module';

import { EditMealPage } from './edit-meal.page';
import {TranslateModule} from "@ngx-translate/core";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        EditMealPageRoutingModule,
        ReactiveFormsModule,
        TranslateModule
    ],
  declarations: [EditMealPage],
  providers: [
    DatePipe
  ]
})
export class EditMealPageModule {}
