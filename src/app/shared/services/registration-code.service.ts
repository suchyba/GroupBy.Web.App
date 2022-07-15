import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ICreateRegistrationCode } from '../models/registration-code/registration-code-create.model';
import { IRegistrationCode } from '../models/registration-code/registration-code.model';

@Injectable({
  providedIn: 'root'
})
export class RegistrationCodeService {

  constructor(
    private http: HttpClient
  ) { }

  createRegistrationCode(code: ICreateRegistrationCode): Observable<IRegistrationCode> {
    return this.http.post<IRegistrationCode>(`${environment.apiUrl}/api/RegistrationCode/add`, code)
  }
}
