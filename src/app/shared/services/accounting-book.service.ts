import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ICreateAccountingBook } from '../models/accounting-book/accounting-book-create.model';
import { ISimpleAccountingBook } from '../models/accounting-book/accounting-book-simple.model';
import { IUpdateAccountingBook } from '../models/accounting-book/accounting-book-update.model';
import { IAccountingBook } from '../models/accounting-book/accounting-book.model';
import { ISimpleFinancialRecord } from '../models/financial-record/financial-record-simple.model';

@Injectable({
  providedIn: 'root'
})
export class AccountingBookService {

  constructor(private http: HttpClient) { }

  getAccountingBook(id: number, orderNumber: number): Observable<IAccountingBook> {
    return this.http.get<IAccountingBook>(`${environment.apiUrl}/api/accountingBook/${id}/${orderNumber}`)
  }

  getFinancialRecords(id: number, orderNumber: number): Observable<ISimpleFinancialRecord[]> {
    return this.http.get<ISimpleFinancialRecord[]>(`${environment.apiUrl}/api/accountingBook/${id}/${orderNumber}/records`)
  }

  createAccountingBook(book: ICreateAccountingBook): Observable<IAccountingBook> {
    return this.http.post<IAccountingBook>(`${environment.apiUrl}/api/accountingBook/add`, book)
  }

  updateAccountingBook(book: IUpdateAccountingBook): Observable<IAccountingBook> {
    return this.http.put<IAccountingBook>(`${environment.apiUrl}/api/accountingBook/edit`, book)
  }

  deleteAccountingBook(book: ISimpleAccountingBook): Observable<Object> {
    return this.http.delete(`${environment.apiUrl}/api/accountingBook/delete/${book.bookId}/${book.bookOrderNumberId}`)
  }
}
