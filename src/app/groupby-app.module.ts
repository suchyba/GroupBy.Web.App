import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'

import { GroupByAppComponent } from './groupby-app.component';
import { PreloadAllModules, RouterModule } from '@angular/router';
import { appRoutes } from './routes';
import { LoginComponent } from './authentication/login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RegisterComponent } from './authentication/register/register.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CoreModule } from './core/core.module';

@NgModule({
  declarations: [
    // common components
    GroupByAppComponent,
    // authentication
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes, { preloadingStrategy: PreloadAllModules }),
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    CoreModule
  ],
  providers: [
    
  ],
  bootstrap: [GroupByAppComponent]
})
export class GroupByAppModule { }
