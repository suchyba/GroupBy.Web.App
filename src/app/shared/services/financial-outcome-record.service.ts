import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';
import { IFinancialIncomeRecord } from '../models/financial-record/financial-income-record.model';
import { ICreateFinancialOutcomeRecord } from '../models/financial-record/financial-outcome-record-create.modal';
import { IFinancialOutcomeRecord } from '../models/financial-record/financial-outcome-record.model';

@Injectable({
  providedIn: 'root'
})
export class FinancialOutcomeRecordService {
  
  constructor(private http: HttpClient) { }

  CreateFinancialIncomeRecord(record: ICreateFinancialOutcomeRecord): Observable<IFinancialOutcomeRecord> {
    return this.http.post<IFinancialOutcomeRecord>(`${environment.apiUrl}/api/financialOutcomeRecord/add`, record)
  }
  GetFinancialOutcomeRecord(id: number): Observable<IFinancialOutcomeRecord> {
    return this.http.get<IFinancialOutcomeRecord>(`${environment.apiUrl}/api/financialOutcomeRecord/${id}`)
  }
}
