import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { InventoryBookRecordAddModalComponent } from 'src/app/shared/components/modals/inventory-book-record-add-modal/inventory-book-record-add-modal.component';
import { InventoryBookRecordTransferModalComponent } from 'src/app/shared/components/modals/inventory-book-record-transfer-modal/inventory-book-record-transfer-modal.component';
import { InventoryItemHistoryModalComponent } from 'src/app/shared/components/modals/inventory-item-history-modal/inventory-item-history-modal.component';
import { InventoryItemLiquidateComponent } from 'src/app/shared/components/modals/inventory-item-liquidate/inventory-item-liquidate.component';
import { IListInventoryBookRecord } from 'src/app/shared/models/inventory-book-record/inventory-book-record-list.model';
import { IInventoryBook } from 'src/app/shared/models/inventory-book/inventory-book.model';
import { ISimpleInventoryItem } from 'src/app/shared/models/inventory-item/inventory-item-simple.model';
import { IInventoryItem } from 'src/app/shared/models/inventory-item/inventory-item.model';
import { InventoryBookService } from 'src/app/shared/services/inventory-book.service';

@Component({
    templateUrl: './inventory-book-details.component.html',
    styleUrls: ['./inventory-book-details.component.css'],
    standalone: false
})
export class InventoryBookDetailsComponent implements OnInit {
  @Input() inventoryBook: IInventoryBook | undefined
  @Input() records: IListInventoryBookRecord[] | undefined | null = undefined
  @Input() items: ISimpleInventoryItem[] | undefined | null = undefined 

  get availableItems() {return (this.items?.length ?? 0) > 0}

  constructor(
    private route: ActivatedRoute,
    private inventoryBookService: InventoryBookService,
    private modalService: NgbModal) { }

  ngOnInit(): void {
    this.inventoryBook = this.route.snapshot.data['inventoryBook']
    this.reloadLists()
  }

  private reloadLists(): void {
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
      const modalRef = this.modalService.open(InventoryBookRecordAddModalComponent, { size: 'lg' })
      modalRef.componentInstance.recordToCreate = {
        inventoryBookId: this.inventoryBook.id,
        date: undefined,
        documentId: undefined,
        income: true,
        itemId: undefined,
        sourceId: undefined
      }
      modalRef.componentInstance.inventoryBook = this.inventoryBook
      modalRef.closed.subscribe(() => {
        this.records = undefined
        this.items = undefined
        this.reloadLists();
      })
    }
  }

  openLiquidateItemModal(): void {
    if (this.inventoryBook) {
      const modalRef = this.modalService.open(InventoryItemLiquidateComponent, { size: 'lg' })
      modalRef.componentInstance.recordToCreate = {
        inventoryBookId: this.inventoryBook.id,
        date: undefined,
        documentId: undefined,
        income: false,
        itemId: undefined,
        sourceId: undefined
      }
      modalRef.componentInstance.inventoryBook = this.inventoryBook
      modalRef.closed.subscribe(() => {
        this.records = undefined
        this.items = undefined
        this.reloadLists();
      })
    }
  }

  openInventoryBookRecordTransferModal(): void {
    if (this.inventoryBook) {
      const modalRef = this.modalService.open(InventoryBookRecordTransferModalComponent, { size: 'lg' })
      modalRef.componentInstance.recordToCreate = {
        inventoryBookFromId: this.inventoryBook.id,
        date: undefined,
        documentName: undefined,
        itemId: undefined,
        inventoryBookToId: undefined,
        sourceFromId: undefined,
        sourceToId: undefined
      }
      modalRef.componentInstance.inventoryBookFrom = this.inventoryBook
      modalRef.closed.subscribe(() => {
        this.records = undefined
        this.items = undefined
        this.reloadLists();
      })
    }
  }

  deleteInventoryBookClick(): void {

  }

  liquidateItem(item: IInventoryItem) {
    if (this.inventoryBook) {
      const modalRef = this.modalService.open(InventoryItemLiquidateComponent, { size: 'lg' })
      modalRef.componentInstance.recordToCreate = {
        inventoryBookId: this.inventoryBook.id,
        date: undefined,
        documentId: undefined,
        income: false,
        itemId: item.id,
        sourceId: undefined
      }
      modalRef.componentInstance.inventoryBook = this.inventoryBook
      modalRef.componentInstance.item = item
      modalRef.closed.subscribe(() => {
        this.records = undefined
        this.items = undefined
        this.reloadLists();
      })
    }
  }

  transferItem(item: IInventoryItem) {
    if (this.inventoryBook) {
      const modalRef = this.modalService.open(InventoryBookRecordTransferModalComponent, { size: 'lg' })
      modalRef.componentInstance.recordToCreate = {
        inventoryBookFromId: this.inventoryBook.id,
        date: undefined,
        documentName: undefined,
        itemId: item.id,
        inventoryBookToId: undefined,
        sourceFromId: undefined,
        sourceToId: undefined
      }
      modalRef.componentInstance.inventoryBookFrom = this.inventoryBook
      modalRef.componentInstance.itemList = [item]
      modalRef.closed.subscribe(() => {
        this.records = undefined
        this.items = undefined
        this.reloadLists();
      })
    }
  }

  showItemHistory(item: IInventoryItem) {
    if (this.inventoryBook) {
      const modalRef = this.modalService.open(InventoryItemHistoryModalComponent, { size: 'lg' })
      modalRef.componentInstance.item = item
    }
  }
}
