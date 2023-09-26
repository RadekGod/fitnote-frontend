import { Component, OnInit } from '@angular/core';

import {Language} from "../../../../configuration/translations/language";
import {TranslationConfiguration} from "../../../../configuration/translations/translation-configuration";
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-user-settings',
  templateUrl: './user-settings.page.html',
  styleUrls: ['./user-settings.page.scss'],
})
export class UserSettingsPage implements OnInit {

  constructor(private translationConfiguration: TranslationConfiguration) { }

  ngOnInit() {
  }

  changeLanguage(language: string) {
    this.translationConfiguration.changeLanguage(language as Language);

  }

  protected readonly Language = Language;
}
