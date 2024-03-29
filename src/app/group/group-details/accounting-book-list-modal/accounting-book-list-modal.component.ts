import { Component, Input, OnInit } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { AccountingBookAddModalComponent } from 'src/app/shared/components/modals/accounting-book-add-modal/accounting-book-add-modal.component';
import { ConfirmationYesNoModalComponent } from 'src/app/shared/components/modals/confirmation-yes-no-modal/confirmation-yes-no-modal.component';
import { ISimpleAccountingBook } from 'src/app/shared/models/accounting-book/accounting-book-simple.model';
import { AccountingBookService } from 'src/app/shared/services/accounting-book.service';
import { GroupService } from 'src/app/shared/services/group.service';

@Component({
  templateUrl: './accounting-book-list-modal.component.html',
  styleUrls: ['./accounting-book-list-modal.component.css']
})
export class AccountingBookListComponentModal implements OnInit {
  @Input() accountingBooks: ISimpleAccountingBook[] | undefined
  @Input() groupId: string | undefined
  public bookIds: number[] | undefined
  public booksIdHidden: { [key: string]: boolean} = {}
  public booksStausChanging: { [key: string]: boolean} = {}

  constructor(
    public bsModalRef: BsModalRef,
    private groupService: GroupService,
    private accountingBookService: AccountingBookService,
    private modalService: BsModalService,
    private toastrService: ToastrService) { }

  ngOnInit(): void {
    this.bsModalRef.setClass('modal-lg')
    this.refreshBookList()
  }
  
  refreshBookList(): void {
    if (this.groupId)
      this.groupService.getAccountingBooks(this.groupId).subscribe(aBooks => {
        this.accountingBooks = aBooks
        this.bookIds = []
        this.booksIdHidden = {...this.booksIdHidden}
        this.accountingBooks?.forEach(b => {
          if (!this.bookIds?.find(id => id === b.bookIdentificator))
            this.bookIds?.push(b.bookIdentificator)
          if (this.booksIdHidden && this.booksIdHidden[b.bookIdentificator] === undefined)
            this.booksIdHidden[b.bookIdentificator] = true
          if (this.booksStausChanging && this.booksStausChanging[`${b.id}`] === undefined)
            this.booksStausChanging[`${b.id}`] = false
        })
      })
  }
  getBooksWithId(id: number): ISimpleAccountingBook[] | undefined {
    if (this.accountingBooks)
      return this.accountingBooks.filter(b => b.bookIdentificator === id)
    return undefined
  }

  openAddAccountingBookModal(): void {
    const modalRef = this.modalService.show(AccountingBookAddModalComponent, {
      initialState: {
        bookToCreate: {
          relatedGroupId: this.groupId,
          bookIdentificator: undefined,
          bookOrderNumberId: undefined,
          locked: false,
          name: undefined
        }
      }
    })
    this.bsModalRef.hide()
  }

  lockClick(book: ISimpleAccountingBook): void {
    this.booksStausChanging[`${book.id}`] = true
    this.accountingBookService.updateAccountingBook({
      id: book.id,
      bookIdentificator: book.bookIdentificator,
      bookOrderNumberId: book.bookOrderNumberId,
      locked: true,
      name: book.name
    }).subscribe(book => {
      this.refreshBookList()
      this.toastrService.success(`Successfully locked ${book.name} accounting book`)
      this.booksStausChanging[`${book.id}`] = false
    })
  }

  isBookStatusChanging(id: string): boolean {
    return this.booksStausChanging[`${id}`]
  }

  unlockClick(book: ISimpleAccountingBook): void {
    this.booksStausChanging[`${book.id}`] = true
    this.accountingBookService.updateAccountingBook({
      id: book.id,
      bookIdentificator: book.bookIdentificator,
      bookOrderNumberId: book.bookOrderNumberId,
      locked: false,
      name: book.name
    }).subscribe(book => {
      this.refreshBookList()
      this.toastrService.success(`Successfully unlocked ${book.name} accounting book`)
      this.booksStausChanging[`${book.id}`] = false
    })
  }

  deleteAccountingBookClick(book: ISimpleAccountingBook): void {
    this.openConfirmation(this.removeAccountingBook, book)
  }

  openConfirmation(action: (object: any, book: ISimpleAccountingBook) => void, book: ISimpleAccountingBook): boolean {
    const modalRef = this.modalService.show(ConfirmationYesNoModalComponent, { initialState: { message: `You are sure you want to delete ${book.name} accounting book?` } })
    modalRef.onHidden?.subscribe(() => {
      if (modalRef.content?.result) {
        action(this, book)
      }
    })
    return false
  }

  removeAccountingBook(object: AccountingBookListComponentModal, book: ISimpleAccountingBook): void {
      object.accountingBookService.deleteAccountingBook(book).subscribe(result => {
        if (result === null) {
          object.toastrService.success(`Accounting book ${book.name} has been deleted`)
          object.refreshBookList()
        }
      })
  }
}
