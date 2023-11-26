import {Component, OnInit} from '@angular/core';

import {Language} from "../../../../configuration/translations/language";
import {TranslationConfiguration} from "../../../../configuration/translations/translation-configuration";
import {TranslateService} from "@ngx-translate/core";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AlertOptions} from "@ionic/angular";
import {ExerciseType} from "../../../../commons/enums/exercise-types.enum";
import {LengthUnit} from "../../../../commons/enums/length-units.enum";
import {WeightUnit} from "../../../../commons/enums/weight-units.enum";
import {User} from "../../../../commons/models/user.model";
import {UserService} from "../../../../commons/services/user/user.service";
import {ToastService} from "../../../../commons/services/toast/toast.service";

@Component({
  selector: 'app-user-settings',
  templateUrl: './user-settings.page.html',
  styleUrls: ['./user-settings.page.scss'],
})
export class UserSettingsPage implements OnInit {

  lengthUnitOptions: AlertOptions = {
    header: this.translate.instant('MORE.SETTINGS.LENGTH_UNITS.ALERTS.HEADER'),
    subHeader: this.translate.instant('MORE.SETTINGS.LENGTH_UNITS.ALERTS.SUBHEADER')
  };

  weightUnitOptions: AlertOptions = {
    header: this.translate.instant('MORE.SETTINGS.WEIGHT_UNITS.ALERTS.HEADER'),
    subHeader: this.translate.instant('MORE.SETTINGS.WEIGHT_UNITS.ALERTS.SUBHEADER')
  }

  userData: User = this.userService.getUserDetailsFromSession();
  languageOptions = this.translationConfiguration.languageOptions;
  lengthUnits = LengthUnit;
  weightUnits = WeightUnit;

  updateMeasurementUnitsForm = this.formBuilder.group({
    lengthUnit: [this.userData.userSettings.lengthUnit, Validators.required],
    weightUnit: [this.userData.userSettings.weightUnit, Validators.required],
  });

  constructor(private translationConfiguration: TranslationConfiguration,
              private formBuilder: FormBuilder,
              private userService: UserService,
              private toastService: ToastService,
              private translate: TranslateService) {
  }

  ngOnInit() {
    this.initializeAlertOptions();
  }

  initializeAlertOptions() {
    this.translate.onLangChange.subscribe(() => {
      this.translate.get('MORE.SETTINGS.LENGTH_UNITS.ALERTS.HEADER').subscribe(response => {
        this.lengthUnitOptions.header = response;
      });
        this.translate.get('MORE.SETTINGS.LENGTH_UNITS.ALERTS.SUBHEADER').subscribe(response => {
          this.lengthUnitOptions.subHeader = response;
      });

      this.translate.get('MORE.SETTINGS.WEIGHT_UNITS.ALERTS.HEADER').subscribe(response => {
        this.weightUnitOptions.header = response;
      });
      this.translate.get('MORE.SETTINGS.WEIGHT_UNITS.ALERTS.SUBHEADER').subscribe(response => {
        this.weightUnitOptions.subHeader = response;
      });
    });
  }


  changeLanguage(language: string) {
    this.translationConfiguration.changeLanguage(language as Language);

  }

  validateAndUpdateMeasurementUnits(updateMeasurementUnitsForm: FormGroup) {
    if (this.userData.userSettings.lengthUnit !== updateMeasurementUnitsForm.value['lengthUnit'] ||
    this.userData.userSettings.weightUnit !== updateMeasurementUnitsForm.value['weightUnit']) {
      this.userData.userSettings.lengthUnit = updateMeasurementUnitsForm.value['lengthUnit'];
      this.userData.userSettings.weightUnit = updateMeasurementUnitsForm.value['weightUnit'];
      this.userService.updateUser(this.userData.userSettings).subscribe(async () => {
        this.userService.saveUserDetailsInSession(this.userData);
        await this.toastService.presentToast('success', 'TOAST_MESSAGES.USER_SETTINGS_UPDATE_SUCCESS');
      }, async () => {
        await this.toastService.presentToast('error', 'TOAST_MESSAGES.USER_SETTINGS_UPDATE_ERROR');
      });
    }
  }

}
