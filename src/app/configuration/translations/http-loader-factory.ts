import {HttpBackend} from '@angular/common/http';
import {MultiTranslateHttpLoader} from "ngx-translate-multi-http-loader";

export function httpLoaderFactory(http: HttpBackend) {
  return new MultiTranslateHttpLoader(http, [
    './assets/i18n/translations/']
  );
}
