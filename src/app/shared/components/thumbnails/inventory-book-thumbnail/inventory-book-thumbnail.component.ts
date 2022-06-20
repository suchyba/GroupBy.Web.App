import { Component, Input, OnInit } from '@angular/core';
import { IInventoryBookSimple } from '../../../models/inventory-book/inventory-book-simple.model';

@Component({
  selector: 'shr-inventory-book-thumbnail',
  templateUrl: './inventory-book-thumbnail.component.html',
  styleUrls: ['./inventory-book-thumbnail.component.css']
})
export class InventoryBookThumbnailComponent implements OnInit {
  @Input() inventoryBook: IInventoryBookSimple | undefined
  constructor() { }

  ngOnInit(): void {
  }

}
