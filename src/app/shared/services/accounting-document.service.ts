import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';
import { ICreateAccountingDocument } from '../models/accounting-document/accounting-document-create.model';
import { IAccountingDocument } from '../models/accounting-document/accounting-document.model';

@Injectable({
  providedIn: 'root'
})
export class AccountingDocumentService {

  constructor(private http: HttpClient) { }

  GetAccountingDocument(id: number): Observable<IAccountingDocument> {
    return this.http.get<IAccountingDocument>(`${environment.apiUrl}/api/accountingDocument/${id}`)
  }
  CreateAccountingDocument(document: ICreateAccountingDocument): Observable<IAccountingDocument> {
    return this.http.post<IAccountingDocument>(`${environment.apiUrl}/api/accountingDocument/add`, document)
  }
}
