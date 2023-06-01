import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ISimpleAccountingDocument } from '../models/accounting-document/accounting-document-simple.model';
import { ISimpleFinancialRecord } from '../models/financial-record/financial-record-simple.model';
import { ICreateProject } from '../models/project/project-create.model';
import { IProject } from '../models/project/project.model';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  constructor(private http: HttpClient) { }

  createProject(project: ICreateProject): Observable<IProject> {
    return this.http.post<IProject>(`${environment.apiUrl}/api/project/add`, project)
  }
  getProject(id: string): Observable<IProject> {
    return this.http.get<IProject>(`${environment.apiUrl}/api/project/${id}`)
  }
  getRelatedFinancialRecords(id: string): Observable<ISimpleFinancialRecord[]> {
    return this.http.get<ISimpleFinancialRecord[]>(`${environment.apiUrl}/api/project/${id}/financialRecords`)
  }
  getAccountingDocuments(id: string): Observable<ISimpleAccountingDocument[]> {
    return this.http.get<ISimpleAccountingDocument[]>(`${environment.apiUrl}/api/project/${id}/accountingDocuments`)
  }
  deleteProject(id: string): Observable<Object> {
    return this.http.delete(`${environment.apiUrl}/api/project/delete/${id}`)
  }
}
