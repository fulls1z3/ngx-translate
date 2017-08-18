# @ngx-universal/translate-loader
Loader for [ngx-translate] that provides application settings to **browser**/**server** platforms

[![npm version](https://badge.fury.io/js/%40ngx-universal%2Ftranslate-loader.svg)](https://www.npmjs.com/package/@ngx-universal/translate-loader)

> Please support this project by simply putting a Github star. Share this library with friends on Twitter and everywhere else you can.

## Table of contents:
- [Prerequisites](#prerequisites)
- [Getting started](#getting-started)
  - [Installation](#installation)
	- [Examples](#examples)
	- [Related packages](#related-packages)
	- [Adding `@ngx-universal/translate-loader` to your project (SystemJS)](#adding-systemjs)
- [Settings](#settings)
	- [Setting up `@ngx-translate` to use `UniversalTranslateLoader`](#setting-up-universalloader)
- [License](#license)

## <a name="prerequisites"></a> Prerequisites
This package depends on `Angular v4.0.0`. Older versions contain outdated dependencies, might produce errors.

Also, please ensure that you are using **`Typescript v2.3.4`** or higher.

## <a name="getting-started"></a> Getting started
### <a name="installation"></a> Installation
You can install **`@ngx-universal/translate-loader`** using `npm`
```
npm install @ngx-universal/translate-loader --save
```

**Note**: You should have already installed [@ngx-translate/core].

### <a name="examples"></a> Examples
- [ng-seed/universal] is an officially maintained seed project, showcasing common patterns and best practices for **`@ngx-universal/translate-loader`**.

### <a name="related-packages"></a> Related packages
The following packages may be used in conjunction with **`@ngx-universal/translate-loader`**:
- [@ngx-translate/core]
- [@ngx-translate/http-loader]

### <a name="adding-systemjs"></a> Adding `@ngx-universal/translate-loader` to your project (SystemJS)
Add `map` for **`@ngx-universal/translate-loader`** in your `systemjs.config`
```javascript
'@ngx-universal/translate-loader': 'node_modules/@ngx-universal/translate-loader/bundles/translate-loader.umd.min.js'
```

## <a name="settings"></a> Settings
### <a name="setting-up-universalloader"></a> Setting up `@ngx-translate` to use `UniversalTranslateLoader`
`UniversalTranslateLoader` requires a `browserLoader` (*ex: `TranslateHttpLoader`*) and settings (*path prefix and suffix*)
for the built-in `fs-loader` to load translations on both platforms.
- Import `TranslateModule` using the mapping `'@ngx-translate/core'` and append `TranslateModule.forRoot({...})` within
the imports property of **app.module**.
- Import `UniversalTranslateLoader` using the mapping `'@ngx-universal/translate-loader'`.

**Note**: *Considering the app.module is the core module in Angular application*.

#### app.module.ts
```TypeScript
...
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { UniversalTranslateLoader } from '@ngx-universal/translate-loader';
...

export function translateFactory(platformId: any, http: Http): TranslateLoader {
  const browserLoader = new TranslateHttpLoader(http);

  return new UniversalTranslateLoader(platformId, browserLoader, './public/assets/i18n');
}

@NgModule({
  declarations: [
    AppComponent,
    ...
  ],
  ...
  imports: [
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (translateFactory),
        deps: [PLATFORM_ID, Http]
      }
    }),
    ...
  ],
  ...
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(@Inject(PLATFORM_ID) private readonly platformId: any) {
  }
}
```

`UniversalTranslateLoader` has four parameters:
- **platformId**: `any` : the platform identifier (*should be injected to module constructor by the `PLATFORM_ID` token*)
- **browserLoader**: `TranslateLoader` : the loader which will run on the `browser` platform (*ex: `TranslateHttpLoader`*)
- **prefix**: `string` : path prefix  (*by default `'/assets/i18n/'`*)
- **suffix**: `string` : file extension/path suffix (*by default `'.json'`*)

> :+1: Well! **`@ngx-universal/translate-loader`** will now provide **translations** to **browser**/**server** platforms.

## <a name="license"></a> License
The MIT License (MIT)

Copyright (c) 2017 [Burak Tasci]

[ngx-translate]: https://github.com/ngx-translate/core
[ng-seed/universal]: https://github.com/ng-seed/universal
[@ngx-translate/http-loader]: https://github.com/ngx-translate/http-loader
[Burak Tasci]: https://github.com/fulls1z3
