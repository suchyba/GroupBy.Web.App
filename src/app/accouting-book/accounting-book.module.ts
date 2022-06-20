import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AccountingBooksRoutes } from './accounting-book.routes';
import { AccountingBookDetailsComponent } from './accounting-book-details/accounting-book-details.component';
import { AccountingBookDetailsResolver } from './accounting-book-details/accounting-book-details.resolver';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { ModalModule } from 'ngx-bootstrap/modal';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [
    AccountingBookDetailsComponent
  ],
  imports: [
    RouterModule.forChild(AccountingBooksRoutes),
    CollapseModule.forRoot(),
    ModalModule.forRoot(),
    SharedModule
  ],
  providers: [
    AccountingBookDetailsResolver
  ]
})
export class AccountingBookModule { }
