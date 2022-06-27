import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ISimpleInventoryItemSource } from '../models/inventory-item-source/inventory-item-source-simple.model';
import { IInventoryItemSource } from '../models/inventory-item-source/inventory-item-source.model';

@Injectable({
  providedIn: 'root'
})
export class InventoryItemSourceService {

  constructor(private http: HttpClient) { }

  getAllInventoryItemSource(): Observable<ISimpleInventoryItemSource[]> {
    return this.http.get<ISimpleInventoryItemSource[]>(`${environment.apiUrl}/api/inventoryItemSource`)
  }

  getInventoryItemSource(sourceId: number): Observable<IInventoryItemSource> {
    return this.http.get<IInventoryItemSource>(`${environment.apiUrl}/api/inventoryItemSources/${sourceId}`)
  }
}
