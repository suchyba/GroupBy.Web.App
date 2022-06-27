import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { IGroup } from 'src/app/shared/models/group/group.model';
import { GroupService } from 'src/app/shared/services/group.service';

@Injectable({
  providedIn: 'root'
})
export class GroupDetailsResolver implements Resolve<IGroup> {
  constructor(private groupService: GroupService) {

  }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IGroup> {
    return this.groupService.getGroup(route.params['id'])
  }
}
