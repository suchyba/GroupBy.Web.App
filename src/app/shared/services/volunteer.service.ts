import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ISimpleGroup } from '../models/group/group-simple.model';
import { IListRegistrationCode } from '../models/registration-code/registration-code-list.model';
import { ISimpleVolunteer } from '../models/volunteer/volunteer-simple.model';
import { IUpdateVolunteer } from '../models/volunteer/volunteer-update.model';
import { IVolunteer } from '../models/volunteer/volunteer.model';

@Injectable({
  providedIn: 'root'
})
export class VolunteerService {

  constructor(private http: HttpClient) { }

  getGroups(volunteerId: string): Observable<ISimpleGroup[]> {
    return this.http.get<ISimpleGroup[]>(`${environment.apiUrl}/api/volunteer/${volunteerId}/groups`)
  }
  getOwnedGroups(volunteerId: string): Observable<ISimpleGroup[]> {
    return this.http.get<ISimpleGroup[]>(`${environment.apiUrl}/api/volunteer/${volunteerId}/ownedgroups`)
  }
  getVolunteer(volunteerId: string): Observable<IVolunteer> {
    return this.http.get<IVolunteer>(`${environment.apiUrl}/api/volunteer/${volunteerId}`)
  }
  getAllVolunteers(): Observable<ISimpleVolunteer[]> {
    return this.http.get<ISimpleVolunteer[]>(`${environment.apiUrl}/api/volunteer`)
  }
  updateVolunteer(volunteer: IUpdateVolunteer): Observable<IVolunteer>{
    return this.http.put<IVolunteer>(`${environment.apiUrl}/api/volunteer/update`, volunteer)
  }
  getRegistrationCodes(volunteerId: string) :Observable<IListRegistrationCode[]> {
    return this.http.get<IListRegistrationCode[]>(`${environment.apiUrl}/api/volunteer/${volunteerId}/registrationcodes`)
  }
}
