import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BsModalService } from 'ngx-bootstrap/modal';
import { InventoryBookRecordAddModalComponent } from 'src/app/shared/components/modals/inventory-book-record-add-modal/inventory-book-record-add-modal.component';
import { InventoryBookRecordTransferModalComponent } from 'src/app/shared/components/modals/inventory-book-record-transfer-modal/inventory-book-record-transfer-modal.component';
import { InventoryItemLiquidateComponent } from 'src/app/shared/components/modals/inventory-item-liquidate/inventory-item-liquidate.component';
import { IListInventoryBookRecord } from 'src/app/shared/models/inventory-book-record/inventory-book-record-list.model';
import { IInventoryBook } from 'src/app/shared/models/inventory-book/inventory-book.model';
import { ISimpleInventoryItem } from 'src/app/shared/models/inventory-item/inventory-item-simple.model';
import { InventoryBookService } from 'src/app/shared/services/inventory-book.service';

@Component({
  templateUrl: './inventory-book-details.component.html',
  styleUrls: ['./inventory-book-details.component.css']
})
export class InventoryBookDetailsComponent implements OnInit {
  @Input() inventoryBook: IInventoryBook | undefined
  @Input() records: IListInventoryBookRecord[] | undefined | null = undefined
  @Input() items: ISimpleInventoryItem[] | undefined | null = undefined 

  get availableItems() {return (this.items?.length ?? 0) > 0}

  constructor(
    private route: ActivatedRoute,
    private inventoryBookService: InventoryBookService,
    private modalService: BsModalService) { }

  ngOnInit(): void {
    this.inventoryBook = this.route.snapshot.data['inventoryBook']
    if (this.inventoryBook)
    {
      this.inventoryBookService.getRecords(this.inventoryBook.id).subscribe(rec => {
        this.records = rec.sort((r1, r2) => new Date(r1.date).getTime() - new Date(r2.date).getTime()).map(r => {
          r.date = new Date(r.date)
          return r
        })
      })
      this.inventoryBookService.getItems(this.inventoryBook.id).subscribe(i => {
        this.items = i
      })
    }
  }

  openInventoryBookRecordAddModal(): void {
    if (this.inventoryBook) {
      this.modalService.show(InventoryBookRecordAddModalComponent, {
        initialState: {
          recordToCreate: {
            inventoryBookId: this.inventoryBook.id,
            date: undefined,
            documentId: undefined,
            income: true,
            itemId: undefined,
            sourceId: undefined
          },
          inventoryBook: this.inventoryBook
        }
      })
    }
  }

  openLiquidateItemModal(): void {
    if (this.inventoryBook) {
      this.modalService.show(InventoryItemLiquidateComponent, {
        initialState: {
          recordToCreate: {
            inventoryBookId: this.inventoryBook.id,
            date: undefined,
            documentId: undefined,
            income: false,
            itemId: undefined,
            sourceId: undefined
          },
          inventoryBook: this.inventoryBook
        }
      })
    }
  }

  openInventoryBookRecordTransferModal(): void {
    if (this.inventoryBook) {
      this.modalService.show(InventoryBookRecordTransferModalComponent, {
        initialState: {
          recordToCreate: {
            inventoryBookFromId: this.inventoryBook.id,
            date: undefined,
            documentId: undefined,
            itemId: undefined,
            inventoryBookToId: undefined,
            sourceFromId: undefined,
            sourceToId: undefined
          },
          inventoryBookFrom: this.inventoryBook
        }
      })
    }
  }

  deleteInventoryBookClick(): void {

  }
}
