import {HttpBackend} from '@angular/common/http';
import {MultiTranslateHttpLoader} from "ngx-translate-multi-http-loader";

export function httpLoaderFactory(http: HttpBackend) {
  return new MultiTranslateHttpLoader(http, [
    './assets/i18n/translations/',
    './assets/i18n/translations/commons/',
    './assets/i18n/translations/login/',
    './assets/i18n/translations/register/',
    './assets/i18n/translations/tabs/',
    './assets/i18n/translations/tabs/body/',
    './assets/i18n/translations/tabs/diet/',
    './assets/i18n/translations/tabs/more/settings/',
    './assets/i18n/translations/tabs/more/activity/',
    './assets/i18n/translations/tabs/more/exercise/',
    './assets/i18n/translations/tabs/training-plans/',
    './assets/i18n/translations/tabs/history/'
    ]
  );
}
