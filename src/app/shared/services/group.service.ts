import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/core/auth/auth.service';
import { environment } from 'src/environments/environment';
import { IGroup } from '../models/group/group.model';
import { ISimpleGroup } from '../models/group/group-simple.model';
import { ISimpleProject } from '../models/project/project-simple.model';
import { ISimpleVolunteer } from '../models/volunteer/volunteer-simple.model';
import { ISimpleAccountingBook } from '../models/accounting-book/accounting-book-simple.model';
import { ICreateGroup } from '../models/group/group-create.model';
import { ISimpleAccountingDocument } from '../models/accounting-document/accounting-document-simple.model';

@Injectable()
export class GroupService {

  constructor(private http: HttpClient, private authService: AuthService) {

  }

  getGroup(id: number): Observable<IGroup> {
    return this.http.get<IGroup>(`${environment.apiUrl}/api/group/${id}`)
  }
  getChaildGroups(id: number): Observable<ISimpleGroup[]> {
    return this.http.get<ISimpleGroup[]>(`${environment.apiUrl}/api/group/${id}/subgroups`)
  }
  getMembers(id: number): Observable<ISimpleVolunteer[]> {
    return this.http.get<ISimpleVolunteer[]>(`${environment.apiUrl}/api/group/${id}/members`)
  }
  getProjects(id: number): Observable<ISimpleProject[]> {
    return this.http.get<ISimpleProject[]>(`${environment.apiUrl}/api/group/${id}/projects`)
  }
  getAccountingBooks(id: number): Observable<ISimpleAccountingBook[]> {
    return this.http.get<ISimpleAccountingBook[]>(`${environment.apiUrl}/api/group/${id}/accountingBooks`)
  }
  createGroup(group: ICreateGroup) {
    return this.http.post(`${environment.apiUrl}/api/group/add`, group)
  }
  getAccountingDocuments(groupId: number, projectId: number | undefined) {
    if (projectId)
      return this.http.get<ISimpleAccountingDocument[]>(`${environment.apiUrl}/api/group/${groupId}/accountingDocuments`, {
        params: {
          'project-id': projectId
        }
      })
    else
      return this.http.get<ISimpleAccountingDocument[]>(`${environment.apiUrl}/api/group/${groupId}/accountingDocuments`)
  }
  deleteGroup(id: number): Observable<Object> {
    return this.http.delete(`${environment.apiUrl}/api/group/delete/${id}`)
  }
}
