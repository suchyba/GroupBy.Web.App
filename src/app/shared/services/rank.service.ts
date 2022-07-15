import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ISimpleRank } from '../models/rank/rank-simple.model';

@Injectable({
  providedIn: 'root'
})
export class RankService {

  constructor(
    private http: HttpClient
  ) { }

  getAllRanks(): Observable<ISimpleRank[]> {
    return this.http.get<ISimpleRank[]>(`${environment.apiUrl}/api/rank`)
  }
}
