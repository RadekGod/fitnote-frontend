import {Component} from '@angular/core';
import {TranslationConfiguration} from "./configuration/translations/translation-configuration";

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {

  constructor(private translationConfiguration: TranslationConfiguration) {
    this.translationConfiguration.initializeTranslations();
  }

  ngOnInit(): void {
  }

}
