import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'

import { GroupByAppComponent } from './groupby-app.component';
import { PreloadAllModules, RouterModule } from '@angular/router';
import { appRoutes } from './routes';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CoreModule } from './core/core.module';

@NgModule({
  declarations: [
    // common components
    GroupByAppComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes, { preloadingStrategy: PreloadAllModules }),
    HttpClientModule,
    BrowserAnimationsModule,
    CoreModule
  ],
  providers: [
    
  ],
  bootstrap: [GroupByAppComponent]
})
export class GroupByAppModule { }
