import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../shared/auth/auth.service';
import { VolunteerService } from '../shared/services/volunteer.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  name: string | undefined

  constructor(
    private authService: AuthService,
    private volunteerService: VolunteerService,
    private router: Router) {
    if (this.isLogged) {
      const volunteerId = authService.getUserId()
      if (volunteerId) {
        volunteerService.getVolunteer(volunteerId).subscribe(v => {
          this.name = v.firstNames + ' ' + v.lastName
        })
      }
    }
  }

  get isLogged() { return this.authService.isLoggedIn() }

  ngOnInit(): void { }
  logout() {
    this.authService.logout()
    this.router.navigate(['/login'])
  }
}
