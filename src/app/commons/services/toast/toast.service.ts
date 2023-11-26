import { Injectable } from '@angular/core';
import {ToastController} from "@ionic/angular";
import {TranslateService} from "@ngx-translate/core";

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor(private toastController: ToastController,
              private translate: TranslateService) { }

  async presentToast(type: 'success' | 'error', message: string) {
    const toast = await this.toastController.create({
      cssClass: `${type}-toast`,
      icon: type === 'success' ? 'checkmark-outline' : 'close-outline',
      message: this.translate.instant(message),
      duration: 2500,
      position: 'top'
    });

    await toast.present();
  }
}
