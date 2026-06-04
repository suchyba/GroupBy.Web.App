/// <reference types="@angular/localize" />

import { enableProdMode, provideZoneChangeDetection } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { GroupByAppModule } from './app/groupby-app.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(GroupByAppModule, { applicationProviders: [provideZoneChangeDetection()], })
  .catch(err => console.error(err));
