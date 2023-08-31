import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ICreateInventoryItem } from '../models/inventory-item/inventory-item-create.model';
import { ISimpleInventoryItem } from '../models/inventory-item/inventory-item-simple.model';
import { IInventoryItem } from '../models/inventory-item/inventory-item.model';
import { IListInventoryBookRecord } from '../models/inventory-book-record/inventory-book-record-list.model';

@Injectable({
  providedIn: 'root'
})
export class InventoryItemService {

  constructor(private http:HttpClient) { }

  getAllInventoryitems(): Observable<ISimpleInventoryItem[]> {
    return this.http.get<ISimpleInventoryItem[]>(`${environment.apiUrl}/api/inventoryItem`)
  }

  getInventoryItem(itemId: string): Observable<IInventoryItem> {
    return this.http.get<IInventoryItem>(`${environment.apiUrl}/inventoryItem/${itemId}`)
  }

  getInventoryItemsWithoutHistory(): Observable<ISimpleInventoryItem[]> {
    return this.http.get<ISimpleInventoryItem[]>(`${environment.apiUrl}/api/inventoryItem/noHistory`)
  }

  createInventoryItem(item: ICreateInventoryItem): Observable<IInventoryItem> {
    return this.http.post<IInventoryItem>(`${environment.apiUrl}/api/inventoryItem/add`, item)
  }

  getInventoryItemHistory(itemId: string): Observable<IListInventoryBookRecord[]> {
    return this.http.get<IListInventoryBookRecord[]>(`${environment.apiUrl}/api/inventoryItem/${itemId}/history`)
  }
}
