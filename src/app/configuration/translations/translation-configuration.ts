import {EventEmitter, Injectable} from '@angular/core';
import {Language} from "./language";
import {TranslateService} from "@ngx-translate/core";

@Injectable({
  providedIn: 'root'
})
export class TranslationConfiguration {

  public currentLanguage!: Language;
  public changeLanguageEvent: EventEmitter<Language> = new EventEmitter<Language>();

  constructor(private translateService: TranslateService) { }

  public initializeTranslations(): void {
    const language = localStorage.getItem('language');
    if (language) {
      this.currentLanguage = language as Language;
    } else {
      this.changeLanguage(Language.PL);
    }
    this.translateService.use(this.currentLanguage);
  }

  public changeLanguage(language: Language): void {
    this.currentLanguage = language;
    localStorage.setItem('language', this.currentLanguage);
    this.translateService.use(this.currentLanguage);

    this.changeLanguageEvent.emit(language);
  }

  public getCurrentLanguage(): Language {
    return this.currentLanguage;
  }
}
