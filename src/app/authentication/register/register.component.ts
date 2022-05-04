import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { first } from 'rxjs';
import { AuthService } from 'src/app/shared/auth/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup
  submitted: boolean = false
  loading: boolean = false
  error: any
  errorMessage: string = ''

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router) {

    if (authService.isLoggedIn())
      this.router.navigate(['/'])

    this.registerForm = this.formBuilder.group(
      {
        email: ['', Validators.compose([Validators.required, Validators.email])],
        address: [''],
        phone: ['', Validators.required],
        password: ['', Validators.required],
        confirmPassword: ['', Validators.compose([Validators.required, compareToStringValidator()])],
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        registerCode: ['', Validators.required],
        birthDate: [new Date, Validators.required],
      },
      { validators: [compareToStringValidator()] })
  }

  get fields() { return this.registerForm.controls }

  ngOnInit(): void {

  }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.registerForm.invalid) {
      return;
    }

    this.loading = true;

    this.authService.register({
      Email: this.registerForm.controls['email'].value,
      RelatedVolunteerBirthDate: this.registerForm.controls['birthDate'].value,
      RelatedVolunteerFirstNames: this.registerForm.controls['firstName'].value,
      RelatedVolunteerLastName: this.registerForm.controls['lastName'].value,
      Password: this.registerForm.controls['password'].value,
      RelatedVolunteerPhoneNumber: this.registerForm.controls['phone'].value,
      RegistrationCode: this.registerForm.controls['registerCode'].value,
      RelatedVolunteerAddress: this.registerForm.controls['address'].value
    }).pipe(first())
      .subscribe({
        complete: () => this.router.navigate(['login']),
        error: (error) => {
          this.error = error;
          if (error?.id)
            this.errorMessage = error.message
          this.loading = false;
        }
      })
  }
}
export function compareToStringValidator(): ValidatorFn {
  return (group: AbstractControl): { [key: string]: boolean } | null => {
    const confPassword = group?.value

    const password = group?.parent?.get('password')?.value

    if (!password || !confPassword) {
      return null;
    }
    if (password !== confPassword) {
      return { comparation: true }
    }

    return null;
  }
}
