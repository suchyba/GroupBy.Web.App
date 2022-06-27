import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { InventoryBookService } from 'src/app/shared/services/inventory-book.service';
import { ISimpleInventoryBook } from '../../../models/inventory-book/inventory-book-simple.model';
import { ConfirmationYesNoModalComponent } from '../../modals/confirmation-yes-no-modal/confirmation-yes-no-modal.component';

@Component({
  selector: 'shr-inventory-book-thumbnail',
  templateUrl: './inventory-book-thumbnail.component.html',
  styleUrls: ['./inventory-book-thumbnail.component.css']
})
export class InventoryBookThumbnailComponent implements OnInit {
  @Input() inventoryBook: ISimpleInventoryBook | undefined
  @Input() canRemove: boolean = false
  @Output() deletedEvent: EventEmitter<undefined> = new EventEmitter<undefined>()

  constructor(
    private modalService: BsModalService,
    private toastrService: ToastrService,
    private inventoryBookService: InventoryBookService
  ) { }

  ngOnInit(): void {

  }

  removeInventoryBook(object: InventoryBookThumbnailComponent): void {
    if (object.inventoryBook?.id) {
      object.inventoryBookService.deleteInventoryBook(object.inventoryBook.id).subscribe(result => {
        if (!result) {
          object.toastrService.success(`Inventory book ${object.inventoryBook?.name} has been deleted`)
          object.deletedEvent.emit()
        }
      })
    }
  }

  openConfirmation(action: (object: any) => void): boolean {
    const modalRef = this.modalService.show(ConfirmationYesNoModalComponent, { initialState: { message: 'You are sure you want to delete this inventory book?' } })
    modalRef.onHidden?.subscribe(() => {
      if (modalRef.content?.result) {
        action(this)
      }
    })
    return false
  }

  onDeleteClick(): void {
    if (this.inventoryBook)
      this.openConfirmation(this.removeInventoryBook)
  }

}
