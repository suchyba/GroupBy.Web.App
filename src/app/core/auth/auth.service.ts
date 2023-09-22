import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, tap } from 'rxjs';
import { IUser } from 'src/app/shared/models/auth/user.model';
import { environment } from 'src/environments/environment';
import { IRegister } from '../../shared/models/auth/register.model';
import { ISimpleUser } from '../../shared/models/auth/user-simple.model';

@Injectable()
export class AuthService {

  private volunteerIdSubject: BehaviorSubject<string | null>
    = new BehaviorSubject<string | null>(null)

  readonly voluneerId$ = this.volunteerIdSubject.asObservable()

  constructor(private http: HttpClient) {
    let v_id = localStorage.getItem('volunteer_id')
    if (v_id !== null)
      this.volunteerIdSubject.next(v_id)
  }

  login(email: string, password: string) {
    console.log(environment.apiUrl)
    return this.http.post<ISimpleUser>(`${environment.apiUrl}/api/authenticate/login`, { email, password }, { withCredentials: true })
      .pipe(tap(res => {
        localStorage.setItem('id_token', res.token)
        localStorage.setItem('volunteer_id', res.volunteerId)
        localStorage.setItem('email', res.email)

        this.startRefreshTokenTimer();
        this.volunteerIdSubject.next(res.volunteerId)
      }))
  }

  register(registerModel: IRegister) {
    return this.http.post(`${environment.apiUrl}/api/authenticate/register`, registerModel);
  }

  logout() {
    // revoke token only if still have auth token
    if (localStorage.getItem('id_token') != null)
      this.http.post(`${environment.apiUrl}/api/authenticate/revokeToken`, {}, { withCredentials: true }).subscribe();

    this.stopRefreshTokenTimer();
    localStorage.removeItem('id_token');
    localStorage.removeItem('volunteer_id');
    localStorage.removeItem('email');

    this.volunteerIdSubject.next(null)
  }

  public getUserId(): string | undefined {
    const volunteerId: string | undefined = localStorage.getItem('volunteer_id') ?? undefined
    if (volunteerId)
      return volunteerId;

    return undefined
  }

  public isLoggedIn(): boolean {
    return localStorage.getItem('id_token') != null;
  }

  public isLoggedOut(): boolean {
    return !this.isLoggedIn();
  }

  public getCurrentUser(): Observable<IUser | null> {
    let email = localStorage.getItem('email')
    if (!email)
      return of(null)
    else {
      return this.http.get<IUser>(`${environment.apiUrl}/api/authenticate/user`, {
        params: {
          email: email
        }
      })
    }
  }

  public confirmEmail(email: string, token: string): Observable<undefined> {
    return this.http.post<undefined>(`${environment.apiUrl}/api/authenticate/verify`, null, {
      params: {
        token: encodeURIComponent(token),
        email: email
      }
    })
  }

  public refreshToken() {
    return this.http.post<ISimpleUser>(`${environment.apiUrl}/api/authenticate/refreshToken`, null, { withCredentials: true })
      .pipe(tap(res => {
        localStorage.setItem('id_token', res.token)
        localStorage.setItem('volunteer_id', res.volunteerId)
        localStorage.setItem('email', res.email)

        this.startRefreshTokenTimer();
        this.volunteerIdSubject.next(res.volunteerId)
      }))
  }

  private refreshTokenTimeout?: NodeJS.Timeout;

  private startRefreshTokenTimer() {
    // parse json object from base64 encoded jwt token
    const jwtBase64 = localStorage.getItem('id_token')!.split('.')[1];
    const jwtToken = JSON.parse(atob(jwtBase64));

    // set a timeout to refresh the token a minute before it expires
    const expires = new Date(jwtToken.exp * 1000);
    const timeout = expires.getTime() - Date.now() - (60 * 1000);
    this.refreshTokenTimeout = setTimeout(() => this.refreshToken().subscribe(), timeout);
  }

  private stopRefreshTokenTimer() {
    if (this.refreshTokenTimeout)
      clearTimeout(this.refreshTokenTimeout);
  }
}
