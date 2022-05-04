import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ISimpleGroup } from '../models/group/group-simple.model';
import { IVolunteer } from '../models/volunteer/volunteer.model';

@Injectable({
  providedIn: 'root'
})
export class VolunteerService {

  constructor(private http: HttpClient) { }

  getGroups(volunteerId: number): Observable<ISimpleGroup[]> {
    return this.http.get<ISimpleGroup[]>(`${environment.apiUrl}/api/volunteer/${volunteerId}/groups`)
  }
  getOwnedGroups(volunteerId: number): Observable<ISimpleGroup[]>{
    return this.http.get<ISimpleGroup[]>(`${environment.apiUrl}/api/volunteer/${volunteerId}/ownedgroups`)
  }
  getVolunteer(volunteerId: number): Observable<IVolunteer>{
    return this.http.get<IVolunteer>(`${environment.apiUrl}/api/volunteer/${volunteerId}`)
  }
}
