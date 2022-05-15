import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { IProject } from 'src/app/shared/models/project/project.model';
import { ProjectService } from 'src/app/shared/services/project.service';

@Injectable({
  providedIn: 'root'
})
export class ProjectDetailsResolver implements Resolve<IProject> {

  constructor(private projectService: ProjectService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IProject> {
    return this.projectService.getProject(route.params['id']);
  }
}
