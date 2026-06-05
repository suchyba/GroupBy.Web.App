import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http'

import { GroupByAppComponent } from './groupby-app.component';
import { PreloadAllModules, RouterModule } from '@angular/router';
import { appRoutes } from './routes';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CoreModule } from './core/core.module';
import { NgbModule, NgbAccordionModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({ declarations: [
        // common components
        GroupByAppComponent
    ],
    bootstrap: [GroupByAppComponent], imports: [BrowserModule,
        RouterModule.forRoot(appRoutes, { preloadingStrategy: PreloadAllModules }),
        BrowserAnimationsModule,
        CoreModule,
        NgbModule,
        NgbAccordionModule], providers: [
        provideHttpClient(withInterceptorsFromDi())
    ] })
export class GroupByAppModule { }
