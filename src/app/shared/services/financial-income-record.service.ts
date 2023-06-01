import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';
import { ICreateFinancialIncomeRecord } from '../models/financial-record/financial-income-record-create.model';
import { IFinancialIncomeRecord } from '../models/financial-record/financial-income-record.model';

@Injectable({
  providedIn: 'root'
})
export class FinancialIncomeRecordService {

  constructor(private http: HttpClient) { }

  CreateFinancialIncomeRecord(record: ICreateFinancialIncomeRecord): Observable<IFinancialIncomeRecord> {
    return this.http.post<IFinancialIncomeRecord>(`${environment.apiUrl}/api/financialIncomeRecord/add`, record)
  }
  GetFinancialIncomeRecord(id: string): Observable<IFinancialIncomeRecord> {
    return this.http.get<IFinancialIncomeRecord>(`${environment.apiUrl}/api/financialIncomeRecord/${id}`)
  }
}
