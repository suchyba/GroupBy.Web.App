import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, tap } from 'rxjs';
import { IUser } from 'src/app/shared/models/auth/user.model';
import { environment } from 'src/environments/environment';
import { IRegister } from '../../shared/models/auth/register.model';
import { ISimpleUser } from '../../shared/models/auth/user-simple.model';

@Injectable()
export class AuthService {

  private volunteerIdSubject: BehaviorSubject<number | null>
    = new BehaviorSubject<number | null>(null)

  readonly voluneerId$ = this.volunteerIdSubject.asObservable()

  constructor(private http: HttpClient) {
    let v_id = localStorage.getItem('volunteer_id')
    if (v_id !== null)
      this.volunteerIdSubject.next(parseInt(v_id))
  }

  login(email: string, password: string) {
    return this.http.post<ISimpleUser>(`${environment.apiUrl}/api/authenticate/login`, { email, password })
      .pipe(tap(res => {
        localStorage.setItem('id_token', res.token)
        localStorage.setItem('volunteer_id', res.volunteerId)
        localStorage.setItem('email', res.email)

        this.volunteerIdSubject.next(parseInt(res.volunteerId))
      }))
  }

  register(registerModel: IRegister) {
    return this.http.post(`${environment.apiUrl}/api/authenticate/register`, registerModel);
  }

  logout() {
    localStorage.removeItem('id_token');
    localStorage.removeItem('volunteer_id');
    localStorage.removeItem('email');

    this.volunteerIdSubject.next(null)
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
}
