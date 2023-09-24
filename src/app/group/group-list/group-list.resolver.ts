import { Injectable } from '@angular/core';
import { Router, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/core/auth/auth.service';
import { ISimpleGroup } from 'src/app/shared/models/group/group-simple.model';
import { VolunteerService } from 'src/app/shared/services/volunteer.service';

@Injectable()
export class GroupListResolver  {

  constructor(private volunteerService: VolunteerService, private authService: AuthService) {

  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ISimpleGroup[] | undefined> {
    const volunteerId: string | undefined = this.authService.getUserId()
    if (volunteerId)
      return this.volunteerService.getGroups(volunteerId)

    return new Observable<undefined>()
  }
}
