import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { VolunteerService } from '../../shared/services/volunteer.service';
import { map, Observable, of, switchMap, tap } from 'rxjs';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  nameObs: Observable<string> = new Observable()

  constructor(
    private authService: AuthService,
    private volunteerService: VolunteerService,
    private router: Router) {

    this.nameObs = authService.voluneerId$.pipe(
      switchMap(v => {
        if (v) {
          return this.volunteerService.getVolunteer(v)
        }
        return of(undefined)
      }),
      map(v => {
        if (v) {
          return v.firstNames + ' ' + v.lastName
        }
        return ''
      }))
  }

  get isLogged() { return this.authService.isLoggedIn() }

  ngOnInit(): void { }
  logout() {
    this.authService.logout()
    this.router.navigate(['/auth/login'])
  }
}
