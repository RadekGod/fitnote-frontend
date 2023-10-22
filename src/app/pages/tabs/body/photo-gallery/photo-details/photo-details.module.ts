import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PhotoDetailsPageRoutingModule } from './photo-details-routing.module';

import { PhotoDetailsPage } from './photo-details.page';
import {TranslateModule} from "@ngx-translate/core";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        PhotoDetailsPageRoutingModule,
        ReactiveFormsModule,
        TranslateModule
    ],
  declarations: [PhotoDetailsPage]
})
export class PhotoDetailsPageModule {}
