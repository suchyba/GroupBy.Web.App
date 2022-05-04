import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
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
}
