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
import { ISimpleDocument } from '../models/document/document-simple.model';
import { IUpdateGroup } from '../models/group/group-update.model';

@Injectable()
export class GroupService {

  constructor(private http: HttpClient, private authService: AuthService) {

  }

  getGroup(id: string): Observable<IGroup> {
    return this.http.get<IGroup>(`${environment.apiUrl}/api/group/${id}`)
  }
  getChildGroups(id: string): Observable<ISimpleGroup[]> {
    return this.http.get<ISimpleGroup[]>(`${environment.apiUrl}/api/group/${id}/subgroups`)
  }
  getMembers(id: string): Observable<ISimpleVolunteer[]> {
    return this.http.get<ISimpleVolunteer[]>(`${environment.apiUrl}/api/group/${id}/members`)
  }
  getProjects(id: string): Observable<ISimpleProject[]> {
    return this.http.get<ISimpleProject[]>(`${environment.apiUrl}/api/group/${id}/projects`)
  }
  getAccountingBooks(id: string): Observable<ISimpleAccountingBook[]> {
    return this.http.get<ISimpleAccountingBook[]>(`${environment.apiUrl}/api/group/${id}/accountingBooks`)
  }
  createGroup(group: ICreateGroup) {
    return this.http.post(`${environment.apiUrl}/api/group/add`, group)
  }
  getAccountingDocuments(groupId: string, projectId: string | undefined) {
    if (projectId)
      return this.http.get<ISimpleAccountingDocument[]>(`${environment.apiUrl}/api/group/${groupId}/accountingDocuments`, {
        params: {
          'project-id': projectId
        }
      })
    else
      return this.http.get<ISimpleAccountingDocument[]>(`${environment.apiUrl}/api/group/${groupId}/accountingDocuments`)
  }
  deleteGroup(id: string): Observable<Object> {
    return this.http.delete(`${environment.apiUrl}/api/group/delete/${id}`)
  }
  removeMember(groupId: string, volunteerId: string): Observable<Object> {
    return this.http.post(`${environment.apiUrl}/api/group/members/remove/${groupId}/${volunteerId}`, null)
  }
  addMember(groupId: string, volunteerId: string): Observable<Object> {
    return this.http.post(`${environment.apiUrl}/api/group/members/add/${groupId}/${volunteerId}`, null)
  }
  getDocuments(groupId: string, projectId: string | undefined = undefined): Observable<ISimpleDocument[]> {
    if (projectId)
      return this.http.get<ISimpleDocument[]>(`${environment.apiUrl}/api/group/${groupId}/Documents`, {
        params: {
          'project-id': projectId
        }
      })
    else
      return this.http.get<ISimpleDocument[]>(`${environment.apiUrl}/api/group/${groupId}/Documents`)
  }
  getAllGroups(): Observable<ISimpleGroup[]> {
    return this.http.get<ISimpleGroup[]>(`${environment.apiUrl}/api/group`)
  }

  updateGroup(group: IUpdateGroup): Observable<IGroup> {
    return this.http.put<IGroup>(`${environment.apiUrl}/api/group/update`, group);
  }
}
