import {EventEmitter, Injectable} from '@angular/core';
import {Language} from "./language";
import {TranslateService} from "@ngx-translate/core";

interface LanguageOption {
  name: string;
  image: string;
}

@Injectable({
  providedIn: 'root'
})
export class TranslationConfiguration {

  public languageOptions: LanguageOption[] = [{name: Language.PL, image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e9/Flag_of_Poland_%28normative%29.svg/250px-Flag_of_Poland_%28normative%29.svg.png'},
    {name: Language.EN, image: 'https://cdn.britannica.com/25/4825-050-977D8C5E/Flag-United-Kingdom.jpg'}]
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
