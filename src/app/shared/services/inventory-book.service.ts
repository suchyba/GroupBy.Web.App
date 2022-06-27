import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IListInventoryBookRecord } from '../models/inventory-book-record/inventory-book-record-list.model';
import { ICreateInventoryBook } from '../models/inventory-book/inventory-book-create.model';
import { IInventoryBook } from '../models/inventory-book/inventory-book.model';
import { ISimpleInventoryItem } from '../models/inventory-item/inventory-item-simple.model';

@Injectable({
  providedIn: 'root'
})
export class InventoryBookService {

  constructor(private http: HttpClient) { }

  getInventoryBook(bookId: number): Observable<IInventoryBook> {
    return this.http.get<IInventoryBook>(`${environment.apiUrl}/api/inventoryBook/${bookId}`)
  }

  addInventoryBook(book: ICreateInventoryBook): Observable<IInventoryBook> {
    return this.http.post<IInventoryBook>(`${environment.apiUrl}/api/inventoryBook/add`, book)
  }

  getRecords(bookId: number): Observable<IListInventoryBookRecord[]> {
    return this.http.get<IListInventoryBookRecord[]>(`${environment.apiUrl}/api/inventoryBook/${bookId}/records`)
  }

  getItems(bookid: number): Observable<ISimpleInventoryItem[]> {
    return this.http.get<ISimpleInventoryItem[]>(`${environment.apiUrl}/api/inventoryBook/${bookid}/items`)
  }

  deleteInventoryBook(bookId: number): Observable<Object> {
    return this.http.delete(`${environment.apiUrl}/api/inventoryBook/${bookId}/delete`)
  }
}
