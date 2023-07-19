import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { environment } from 'src/environments/environment';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(
    private authService: AuthService,
    private toasrService: ToastrService) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(catchError(err => {
      // if token is not valid or there is no token - logout
      if (err.status === 401) {
        if (this.authService.isLoggedIn())
          this.authService.logout()
        location.reload()
      }
      else if (typeof err.error === 'string') {
        this.toasrService.error(err.error)
      }
      if (!environment.production)
        console.log(err)

      const error = err.error || err.statusText
      return throwError(() => error)
    }))
  }
}
