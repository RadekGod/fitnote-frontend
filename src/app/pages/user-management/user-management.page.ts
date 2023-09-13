import {Component, OnInit} from '@angular/core';
import {UserRequestService} from "./services/user-request.service";
import {Language} from "../../configuration/translations/language";
import {TranslationConfiguration} from "../../configuration/translations/translation-configuration";
import {TranslateService} from "@ngx-translate/core";

interface UserFormDto {
  birthDate: number;
  gender: string;
}


@Component({
  selector: 'app-fill-user-data',
  templateUrl: './user-management.page.html',
  styleUrls: ['./user-management.page.scss'],
})
export class UserManagementPage implements OnInit {
  constructor(private translationConfiguration: TranslationConfiguration, private userRequestService: UserRequestService,
              private translateService: TranslateService) { }



  ngOnInit() {
    this.translateService.get('SETTINGS').subscribe((res: string) => {
      console.log(res);
    });
  }

  changeLanguage(language: string) {
    this.translationConfiguration.changeLanguage(language as Language);
    console.log('Current language: ', this.translationConfiguration.getCurrentLanguage());

    this.translateService.get('SETTINGS').subscribe((res: string) => {
      console.log(res);
    });

  }

  protected readonly Language = Language;
}
