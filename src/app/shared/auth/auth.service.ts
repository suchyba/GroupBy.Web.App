import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IRegister } from '../models/auth/register.model';
import { IUser } from '../models/auth/user.model';

@Injectable()
export class AuthService {

  constructor(private http: HttpClient) {

  }

  login(email: string, password: string) {
    return this.http.post<IUser>(`${environment.apiUrl}/api/authenticate/login`, { email, password })
      .pipe(tap(res => {
        localStorage.setItem('id_token', res.token)
        localStorage.setItem('volunteer_id', res.volunteerId)
        localStorage.setItem('email', res.email)
      }))
  }

  register(registerModel: IRegister){
    return this.http.post(`${environment.apiUrl}/api/authenticate/register`, registerModel);
  }

  logout() {
    localStorage.removeItem('id_token');
    localStorage.removeItem('volunteer_id');
    localStorage.removeItem('email');
  }

  public getUserId(): number | undefined {
    const volunteerId: string | undefined = localStorage.getItem('volunteer_id') ?? undefined
    if (volunteerId)
      return parseInt(volunteerId);

    return undefined
  }

  public isLoggedIn(): boolean {
    return localStorage.getItem('id_token') != null;
  }

  public isLoggedOut(): boolean {
    return !this.isLoggedIn();
  }
}
