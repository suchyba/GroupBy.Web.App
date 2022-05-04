import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'

import { GroupByAppComponent } from './groupby-app.component';
import { NavComponent } from './nav/nav.component';
import { PreloadAllModules, RouterModule } from '@angular/router';
import { appRoutes } from './routes';
import { AuthService } from './shared/auth/auth.service';
import { AuthInterceptor } from './shared/auth/auth.interceptor';
import { LoginComponent } from './authentication/login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ErrorInterceptor } from './shared/errors/error.interceptor';
import { RegisterComponent } from './authentication/register/register.component';
import { GroupService } from './shared/services/group.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { GroupAddModalComponent } from './shared/components/modals/group-add-modal/group-add-modal.component';
import { FinancialIncomeRecordAddModalComponent } from './shared/components/modals/financial-income-record-add-modal/financial-income-record-add-modal.component';
import { AccountingDocumentAddModalComponent } from './shared/components/modals/accounting-document-add-modal/accounting-document-add-modal.component';
import { FinancialOutcomeRecordAddModalComponent } from './shared/components/modals/financial-outcome-record-add-modal/financial-outcome-record-add-modal.component';
import { AccountingBookAddModalComponent } from './shared/components/modals/accounting-book-add-modal/accounting-book-add-modal.component';
import { ProjectAddModalComponent } from './shared/components/modals/project-add-modal/project-add-modal.component';

@NgModule({
  declarations: [
    // common components
    GroupByAppComponent,
    NavComponent,
    // authentication
    LoginComponent,
    RegisterComponent,
    // modals
    GroupAddModalComponent,
    FinancialIncomeRecordAddModalComponent,
    AccountingDocumentAddModalComponent,
    FinancialOutcomeRecordAddModalComponent,
    AccountingBookAddModalComponent,
    ProjectAddModalComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes, { preloadingStrategy: PreloadAllModules }),
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule
  ],
  providers: [
    AuthService,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    GroupService
  ],
  bootstrap: [GroupByAppComponent]
})
export class GroupByAppModule { }
