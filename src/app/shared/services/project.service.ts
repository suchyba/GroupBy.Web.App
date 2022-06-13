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
  getProject(id: number): Observable<IProject> {
    return this.http.get<IProject>(`${environment.apiUrl}/api/project/${id}`)
  }
  getRelatedFinancialRecords(id: number): Observable<ISimpleFinancialRecord[]> {
    return this.http.get<ISimpleFinancialRecord[]>(`${environment.apiUrl}/api/project/${id}/financialRecords`)
  }
  getAccountingDocuments(id: number): Observable<ISimpleAccountingDocument[]> {
    return this.http.get<ISimpleAccountingDocument[]>(`${environment.apiUrl}/api/project/${id}/accountingDocuments`)
  }
  deleteProject(id: number): Observable<boolean> {
    return this.http.delete<boolean>(`${environment.apiUrl}/api/project/delete/${id}`)
  }
}
