import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/core/auth/auth.service';

@Component({
  templateUrl: './confirm-email.component.html',
  styleUrls: ['./confirm-email.component.css']
})
export class ConfirmEmailComponent implements OnInit {

  private email: string | null
  private token: string | null

  public loading = false
  public confirmed = false

  constructor(
    private authService: AuthService,
    private route: ActivatedRoute,
    private toastrService: ToastrService,
    private router: Router) {
    this.email = route.snapshot.queryParamMap.get('email')
    this.token = route.snapshot.queryParamMap.get('token')

    if (this.email && this.token) {
      authService.confirmEmail(this.email, this.token).subscribe(() => {
        toastrService.success('Email address confirmed successfully')
        this.loading = false
        this.confirmed = true
        setTimeout(() => {
          router.navigate(['/', 'auth', 'login'])

        }, 5000)
      })
      this.loading = true
    }
    else {
      router.navigate(['/', 'auth', 'login'])
    }
  }

  ngOnInit(): void {

  }

}
