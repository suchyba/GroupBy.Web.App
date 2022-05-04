import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AccountingBooksRoutes } from './accounting-books.routes';
import { AccountingBookDetailsComponent } from './accounting-book-details/accounting-book-details.component';
import { AccountingBookDetailsResolver } from './accounting-book-details/accounting-book-details.resolver';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { ModalModule } from 'ngx-bootstrap/modal';



@NgModule({
  declarations: [
    AccountingBookDetailsComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(AccountingBooksRoutes),
    CollapseModule.forRoot(),
    ModalModule.forRoot()
  ],
  providers: [
    AccountingBookDetailsResolver,

  ]
})
export class AccountingBooksModule { }
