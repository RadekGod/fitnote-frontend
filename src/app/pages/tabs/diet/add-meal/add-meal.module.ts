import { NgModule } from '@angular/core';
import {CommonModule, DatePipe} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddMealPageRoutingModule } from './add-meal-routing.module';

import { AddMealPage } from './add-meal.page';
import {TranslateModule} from "@ngx-translate/core";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddMealPageRoutingModule,
    TranslateModule,
    ReactiveFormsModule
  ],
  declarations: [AddMealPage],
  providers: [
    DatePipe
  ]
})
export class AddMealPageModule {}
