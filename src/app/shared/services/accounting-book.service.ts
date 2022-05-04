import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ICreateAccountingBook } from '../models/accounting-book/accounting-book-create.model';
import { IAccountingBook } from '../models/accounting-book/accounting-book.model';
import { ISimpleFinancialRecord } from '../models/financial-record/financial-record-simple.model';

@Injectable({
  providedIn: 'root'
})
export class AccountingBookService {

  constructor(private http: HttpClient) { }

  GetAccountingBook(id: number, orderNumber: number): Observable<IAccountingBook> {
    return this.http.get<IAccountingBook>(`${environment.apiUrl}/api/accountingBook/${id}/${orderNumber}`)
  }

  GetFinancialRecords(id: number, orderNumber: number): Observable<ISimpleFinancialRecord[]> {
    return this.http.get<ISimpleFinancialRecord[]>(`${environment.apiUrl}/api/accountingBook/${id}/${orderNumber}/records`)
  }

  CreateAccountingBook(book: ICreateAccountingBook): Observable<IAccountingBook> {
    return this.http.post<IAccountingBook>(`${environment.apiUrl}/api/accountingBook/add`, book)
  }
}
