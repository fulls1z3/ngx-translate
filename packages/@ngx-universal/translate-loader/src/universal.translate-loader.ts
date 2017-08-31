// angular
import { isPlatformServer } from '@angular/common';

// libs
import { readFileSync } from 'fs';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import { TranslateLoader } from '@ngx-translate/core';
import { Cached, CacheKey } from '@ngx-cache/core';

export class UniversalTranslateLoader implements TranslateLoader {
  constructor(private readonly platformId: any,
              private readonly browserLoader: TranslateLoader,
              private readonly prefix: string = './assets/i18n/',
              private readonly suffix: string = '.json') {
  }

  @Cached('ngx-translate__translations')
  getTranslation(@CacheKey lang: string): Observable<any> {
    return isPlatformServer(this.platformId)
      ? Observable.create((observer: Observer<any>) => {
        observer.next(JSON.parse(readFileSync(`./${this.prefix}/${lang}${this.suffix}`, 'utf8')));
        observer.complete();
      })
      : this.browserLoader.getTranslation(lang);
  }
}
