import { Injectable } from '@angular/core';
import { Router, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { IProject } from 'src/app/shared/models/project/project.model';
import { ProjectService } from 'src/app/shared/services/project.service';

@Injectable({
  providedIn: 'root'
})
export class ProjectDetailsResolver  {

  constructor(private projectService: ProjectService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IProject> {
    return this.projectService.getProject(route.params['id']);
  }
}
