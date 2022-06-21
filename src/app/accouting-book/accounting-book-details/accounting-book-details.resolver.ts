import { Injectable } from '@angular/core';
import {
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable } from 'rxjs';
import { IAccountingBook } from 'src/app/shared/models/accounting-book/accounting-book.model';
import { AccountingBookService } from 'src/app/shared/services/accounting-book.service';

@Injectable({
  providedIn: 'root'
})
export class AccountingBookDetailsResolver implements Resolve<IAccountingBook> {
  constructor(private accountingBookService: AccountingBookService) { }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IAccountingBook> {
    return this.accountingBookService.getAccountingBook(route.params['bookId'], route.params['bookOrderNumberId'])
  }
}
