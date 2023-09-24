import { Injectable } from '@angular/core';
import { RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { IUser } from 'src/app/shared/models/auth/user.model';
import { AuthService } from '../../core/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class ManageAccountResolver  {

  constructor(
    private authService: AuthService
  ) {

  }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IUser | null> {
    let volunteerId = this.authService.getUserId()
    if (volunteerId)
      return this.authService.getCurrentUser()
    
    return of(null)
  }
}
