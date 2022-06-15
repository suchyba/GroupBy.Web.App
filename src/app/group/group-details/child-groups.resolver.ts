import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable } from 'rxjs';
import { ISimpleGroup } from 'src/app/shared/models/group/group-simple.model';
import { GroupService } from 'src/app/shared/services/group.service';

@Injectable({
  providedIn: 'root'
})
export class ChildGroupsResolver implements Resolve<ISimpleGroup[]> {
  constructor(private groupService: GroupService) {
   
  }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ISimpleGroup[]> {
    return this.groupService.getChaildGroups(route.params['id'])
  }
}
