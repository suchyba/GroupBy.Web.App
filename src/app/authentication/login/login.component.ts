import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../shared/auth/auth.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  returnUrl: string = '/'
  loginForm: FormGroup
  submitted: boolean = false
  loading: boolean = false
  error: string = ''

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute) {

    if (authService.isLoggedIn())
      this.router.navigate(['/'])

    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  ngOnInit(): void {
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/'
  }

  get fields() { return this.loginForm.controls }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }

    this.loading = true;
    this.authService.login(this.fields['email'].value, this.fields['password'].value)
      .pipe(first())
      .subscribe({
        complete: () => this.router.navigate([this.returnUrl]),
        error: (error) => {
          this.error = error;
          this.loading = false;
        }
      })
  }

}
