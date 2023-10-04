import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PhotoDetailsPageRoutingModule } from './photo-details-routing.module';

import { PhotoDetailsPage } from './photo-details.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PhotoDetailsPageRoutingModule
  ],
  declarations: [PhotoDetailsPage]
})
export class PhotoDetailsPageModule {}
