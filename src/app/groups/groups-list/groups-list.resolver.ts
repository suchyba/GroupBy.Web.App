import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/core/auth/auth.service';
import { ISimpleGroup } from 'src/app/shared/models/group/group-simple.model';
import { VolunteerService } from 'src/app/shared/services/volunteer.service';

@Injectable()
export class GroupsListResolver implements Resolve<ISimpleGroup[] | undefined> {

  constructor(private volunteerService: VolunteerService, private authService: AuthService) {

  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ISimpleGroup[] | undefined> {
    const volunteerId: number | undefined = this.authService.getUserId()
    if (volunteerId)
      return this.volunteerService.getGroups(volunteerId)

    return new Observable<undefined>()
  }
}
