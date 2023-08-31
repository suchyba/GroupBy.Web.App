import { Component, Input, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { IListInventoryBookRecord } from 'src/app/shared/models/inventory-book-record/inventory-book-record-list.model';
import { ISimpleInventoryItem } from 'src/app/shared/models/inventory-item/inventory-item-simple.model';
import { InventoryItemService } from 'src/app/shared/services/inventory-item.service';
import { IInventoryTransferModel } from './inventory-transfer-model';

@Component({
  selector: 'app-inventory-item-history-modal',
  templateUrl: './inventory-item-history-modal.component.html',
  styleUrls: ['./inventory-item-history-modal.component.css']
})
export class InventoryItemHistoryModalComponent implements OnInit {
  @Input() item: ISimpleInventoryItem | undefined

  public itemHistory: IListInventoryBookRecord[] | undefined

  public creationRecord: IListInventoryBookRecord | undefined
  public transferRecords: IInventoryTransferModel[] = []
  public liquidationRecord: IListInventoryBookRecord | undefined

  constructor(
    private modalRef: BsModalRef,
    private inventoryItemService: InventoryItemService
  ) { }

  ngOnInit(): void {
    this.modalRef.setClass('modal-lg')

    if (this.item)
      this.inventoryItemService.getInventoryItemHistory(this.item.id).subscribe(history => {
        this.itemHistory = history.map(r => {
          r.date = new Date(r.date)
          return r
        }).sort((r1, r2) => r1.orderId - r2.orderId)

        this.creationRecord = this.itemHistory[0];
        if (this.isItemLiquidated())
          this.liquidationRecord = this.itemHistory[this.itemHistory.length - 1]

        let tempList: IListInventoryBookRecord[] = this.itemHistory.slice(1, this.isItemLiquidated() ? this.itemHistory.length - 1 : this.itemHistory.length)

        tempList.forEach(r => {
          if (r.income === false) {
            let transferRecord: IInventoryTransferModel = {
              orderId: r.orderId,
              date: r.date,
              sourceBook: r.book,
              sourceFrom: r.source,
              document: r.document,
              sourceTo: undefined,
              destinationBook: undefined
            }

            this.transferRecords.push(transferRecord)
          }
          else {
            let transferRecord: IInventoryTransferModel | undefined = this.transferRecords.sort((r1, r2) => r1.orderId - r2.orderId).pop()
            if (transferRecord) {
              transferRecord.destinationBook = r.book
              transferRecord.sourceTo = r.source
              this.transferRecords.push(transferRecord)
            }
          }
        })
      })
    else
      this.onCancel()
  }

  onCancel(): void {
    this.modalRef.hide()
  }

  isItemLiquidated(): boolean {
    if (this.itemHistory)
      return !this.itemHistory[this.itemHistory.length - 1].income

    return false
  }
}