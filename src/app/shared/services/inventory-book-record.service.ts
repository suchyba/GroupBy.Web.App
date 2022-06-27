import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ICreateInventoryBookRecord } from '../models/inventory-book-record/inventory-book-record-create.model';
import { ITransferInventoryBookRecord } from '../models/inventory-book-record/inventory-book-record-transfer.model';
import { IInventoryBookRecord } from '../models/inventory-book-record/inventory-book-record.model';

@Injectable({
  providedIn: 'root'
})
export class InventoryBookRecordService {

  constructor(private http: HttpClient) { }

  addInventoryRecord(record: ICreateInventoryBookRecord): Observable<IInventoryBookRecord> {
    return this.http.post<IInventoryBookRecord>(`${environment.apiUrl}/api/inventoryBookRecord/add`, record)
  }

  transferItem(record: ITransferInventoryBookRecord): Observable<IInventoryBookRecord[]> {
    return this.http.post<IInventoryBookRecord[]>(`${environment.apiUrl}/api/inventoryBookRecord/transfer`, record)
  }
}
