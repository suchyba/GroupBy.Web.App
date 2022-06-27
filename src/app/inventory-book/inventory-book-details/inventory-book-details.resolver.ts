import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { IInventoryBook } from 'src/app/shared/models/inventory-book/inventory-book.model';
import { InventoryBookService } from 'src/app/shared/services/inventory-book.service';

@Injectable({
  providedIn: 'root'
})
export class InventoryBookDetailsResolver implements Resolve<IInventoryBook> {
  constructor(private inventoryBookService: InventoryBookService) {

  }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IInventoryBook> {
    return this.inventoryBookService.getInventoryBook(route.params['id']);
  }
}
