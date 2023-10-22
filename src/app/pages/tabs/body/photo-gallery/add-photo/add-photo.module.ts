import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddPhotoPageRoutingModule } from './add-photo-routing.module';

import { AddPhotoPage } from './add-photo.page';
import {TranslateModule} from "@ngx-translate/core";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddPhotoPageRoutingModule,
    ReactiveFormsModule,
    TranslateModule
  ],
  declarations: [AddPhotoPage]
})
export class AddPhotoPageModule {}
