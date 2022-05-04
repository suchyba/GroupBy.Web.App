import { Component, OnInit } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { AccountingBookAddModalComponent } from 'src/app/shared/components/modals/accounting-book-add-modal/accounting-book-add-modal.component';
import { ISimpleAccountingBook } from 'src/app/shared/models/accounting-book/accounting-book-simple.model';
import { GroupService } from 'src/app/shared/services/group.service';

@Component({
  selector: 'app-accounting-books-list',
  templateUrl: './accounting-books-list-modal.component.html',
  styleUrls: ['./accounting-books-list-modal.component.css']
})
export class AccountingBooksListComponentModal implements OnInit {
  accountingBooks: ISimpleAccountingBook[] | undefined
  bookIds: number[] | undefined
  booksIdHidden: { [key: string]: boolean } = {}
  groupId: number | undefined

  constructor(
    public bsModalRef: BsModalRef,
    private groupService: GroupService,
    private modalService: BsModalService) { }

  ngOnInit(): void {
    this.bsModalRef.setClass('modal-lg')
    if (this.groupId)
      this.groupService.getAccountingBooks(this.groupId).subscribe(aBooks => {
        this.accountingBooks = aBooks
        this.bookIds = []
        this.booksIdHidden = {}
        this.accountingBooks?.forEach(b => {
          if (!this.bookIds?.find(id => id === b.bookId))
            this.bookIds?.push(b.bookId)
          if (this.booksIdHidden)
            this.booksIdHidden[b.bookId] = true
        })
      })
  }

  getBooksWithId(id: number): ISimpleAccountingBook[] | undefined {
    if (this.accountingBooks)
      return this.accountingBooks.filter(b => b.bookId === id)
    return undefined
  }

  openAddAccountingBookModal(): void {
    const modalRef = this.modalService.show(AccountingBookAddModalComponent, {
      initialState: {
        bookToCreate: {
          relatedGroupId: this.groupId,
          bookId: this.groupId,
          bookOrderNumberId: undefined,
          locked: false,
          name: undefined
        }
      }
    })
    this.bsModalRef.hide()
  }
}
