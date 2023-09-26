import {Component} from '@angular/core';
import {TranslationConfiguration} from "./configuration/translations/translation-configuration";
import {NavigationEnd, Router, RoutesRecognized} from "@angular/router";
import {UrlService} from "./commons/services/url/url.service";
import {filter, pairwise} from "rxjs";

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {

  constructor(private router: Router,
              private urlService: UrlService,
              private translationConfiguration: TranslationConfiguration) {
    this.translationConfiguration.initializeTranslations();
  }

  ngOnInit(): void {
    this.router.events
      .pipe(filter((event: any) => event instanceof  RoutesRecognized), pairwise())
      .subscribe((events: RoutesRecognized[]) => {
        this.urlService.setCurrentUrl(events[1].urlAfterRedirects);
        this.urlService.setPreviousUrl(events[0].urlAfterRedirects);
      });
  }

}
