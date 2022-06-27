import { formatDate } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { ISimpleDocument } from 'src/app/shared/models/document/document-simple.model';
import { ISimpleGroup } from 'src/app/shared/models/group/group-simple.model';
import { ICreateInventoryBookRecord } from 'src/app/shared/models/inventory-book-record/inventory-book-record-create.model';
import { ISimpleInventoryBook } from 'src/app/shared/models/inventory-book/inventory-book-simple.model';
import { ISimpleInventoryItemSource } from 'src/app/shared/models/inventory-item-source/inventory-item-source-simple.model';
import { ISimpleInventoryItem } from 'src/app/shared/models/inventory-item/inventory-item-simple.model';
import { ISimpleProject } from 'src/app/shared/models/project/project-simple.model';
import { DocumentService } from 'src/app/shared/services/document.service';
import { GroupService } from 'src/app/shared/services/group.service';
import { InventoryBookRecordService } from 'src/app/shared/services/inventory-book-record.service';
import { InventoryBookService } from 'src/app/shared/services/inventory-book.service';
import { InventoryItemSourceService } from 'src/app/shared/services/inventory-item-source.service';
import { InventoryItemService } from 'src/app/shared/services/inventory-item.service';
import { DocumentAddModalComponent } from '../document-add-modal/document-add-modal.component';
import { InventoryItemAddModalComponent } from '../inventory-item-add-modal/inventory-item-add-modal.component';

@Component({
  selector: 'app-inventory-book-record-add-modal',
  templateUrl: './inventory-book-record-add-modal.component.html',
  styleUrls: ['./inventory-book-record-add-modal.component.css']
})
export class InventoryBookRecordAddModalComponent implements OnInit {
  @Input() recordToCreate: ICreateInventoryBookRecord | undefined
  @Input() group: ISimpleGroup | undefined

  @Input() inventoryBook: ISimpleInventoryBook | undefined
  @Input() item: ISimpleInventoryItem | undefined
  @Input() source: ISimpleInventoryItemSource | undefined
  @Input() document: ISimpleDocument | undefined

  public inventoryBookList: ISimpleInventoryBook[] = []
  public itemList: ISimpleInventoryItem[] = []
  public sourceList: ISimpleInventoryItemSource[] = []
  public documentList: ISimpleDocument[] = []

  public recordAddForm: FormGroup
  public submitted: boolean = false
  public loading: boolean = false
  public error: any
  public errorMessage: string = ''

  get fields() { return this.recordAddForm.controls }

  constructor(
    private formBuilder: FormBuilder,
    private modalRef: BsModalRef,
    private toastrService: ToastrService,
    private inventoryItemSourceService: InventoryItemSourceService,
    private inventoryBookRecordService: InventoryBookRecordService,
    private inventoryBookService: InventoryBookService,
    private inventoryItemService: InventoryItemService,
    private documentService: DocumentService,
    private groupService: GroupService,
    private modalService: BsModalService) {
    this.recordAddForm = formBuilder.group({})
  }

  ngOnInit(): void {
    this.modalRef.setClass('modal-lg')
    this.recordAddForm = this.formBuilder.group({
      inventoryBookId: [this.recordToCreate?.inventoryBookId, Validators.required],
      itemId: [this.recordToCreate?.itemId, Validators.required],
      date: [formatDate(this.recordToCreate?.date ?? new Date(), 'yyyy-MM-dd', 'en'), Validators.required],
      documentId: [this.recordToCreate?.documentId, Validators.required],
      income: [this.recordToCreate?.income],
      sourceId: [this.recordToCreate?.sourceId, Validators.required]
    })

    if (this.group) {
      this.loadLists()
    }
    else if (this.recordToCreate) {
      this.inventoryBookService.getInventoryBook(this.recordToCreate.inventoryBookId).subscribe(book => {
        this.group = book.relatedGroup
        this.loadLists()
      })
    }
  }

  loadLists(): void {
    if (this.recordToCreate) {
      // inventory book
      if (this.recordToCreate.inventoryBookId) {
        if (this.inventoryBook?.id !== this.recordToCreate.inventoryBookId) {
          this.inventoryBookService.getInventoryBook(this.recordToCreate.inventoryBookId).subscribe(book => {
            this.inventoryBook = book
            this.inventoryBookList = [this.inventoryBook]
          })
        }
        if (this.inventoryBook)
          this.inventoryBookList = [this.inventoryBook]

        this.recordAddForm.controls['inventoryBookId'].disable()
      }
      else {

      }

      // item
      if (this.recordToCreate.itemId) {
        if (this.item?.id !== this.recordToCreate.itemId) {
          this.inventoryItemService.getInventoryItem(this.recordToCreate.itemId).subscribe(apiItem => {
            this.item = apiItem
            this.itemList = [this.item]
          })
        }
        if (this.item)
          this.itemList = [this.item]

        this.recordAddForm.controls['itemId'].disable()
      }
      // no item selected getting item without history
      else {
        this.inventoryItemService.getInventoryItemsWithoutHistory().subscribe(items => {
          this.itemList = [...items]
        })
      }

      // document
      if (this.recordToCreate.documentId) {
        if (this.document?.id !== this.recordToCreate.documentId) {
          this.documentService.getDocument(this.recordToCreate.documentId).subscribe(doc => {
            this.document = doc
            this.documentList = [this.document]
          })
        }
        if (this.document)
          this.documentList = [this.document]

        this.recordAddForm.controls['documentId'].disable()
      }
      else {
        if (this.group) {
          this.groupService.getDocuments(this.group.id).subscribe(docs => {
            this.documentList = [...docs]
          })
        }
        else {

        }
      }

      // item source
      if (this.recordToCreate.sourceId) {
        if (this.source?.id !== this.recordToCreate.sourceId) {
          this.inventoryItemSourceService.getInventoryItemSource(this.recordToCreate.sourceId).subscribe(src => {
            this.source = src
            this.sourceList = [this.source]
          })
        }
        if (this.source)
          this.sourceList = [this.source]

        this.recordAddForm.controls['sourceId'].disable()
      }
      else {
        this.inventoryItemSourceService.getAllInventoryItemSource().subscribe(sources => {
          this.sourceList = [...sources]
        })
      }
    }
    else {

    }
  }

  onSubmit(): void {
    this.submitted = true;

    // stop here if form is invalid
    if (this.recordAddForm.invalid) {
      return;
    }

    this.loading = true;

    this.inventoryBookRecordService.addInventoryRecord({
      date: this.recordAddForm.controls['date'].value,
      documentId: this.recordAddForm.controls['documentId'].value,
      income: true,
      inventoryBookId: this.recordAddForm.controls['inventoryBookId'].value,
      itemId: this.recordAddForm.controls['itemId'].value,
      sourceId: this.recordAddForm.controls['sourceId'].value
    }).subscribe({
      complete: () => {
        this.toastrService.success(`Successfully added inventory book record`)
        this.modalRef.hide()
      },
      error: (error) => {
        this.error = error;
        if (error?.id)
          this.errorMessage = error.message
        this.loading = false;
      }
    })
  }

  onCancel(): void {
    this.modalRef.hide()
  }

  openAddDocumentModal(): void {
    if (this.group) {
      let modal = this.modalService.show(DocumentAddModalComponent, {
        initialState: {
          documentToCreate: {
            name: "",
            filePath: "null",
            groupId: this.group.id,
            projectId: undefined
          }
        }
      })
      if (modal.onHidden)
        modal.onHidden.subscribe(() => {
          if (modal.content?.createdDocument && this.documentList) {
            this.documentList = [...this.documentList, modal.content.createdDocument]
            this.fields['documentId'].setValue(modal.content.createdDocument.id)
          }
        })
    }
  }

  openAddItemModal(): void {
    if (this.group) {
      let modal = this.modalService.show(InventoryItemAddModalComponent, {
        initialState: {
          itemToCreate: {
            name: undefined,
            description: undefined,
            symbol: undefined,
            value: undefined
          }
        }
      })
      if (modal.onHidden)
        modal.onHidden.subscribe(() => {
          if (modal.content?.createdItem && this.itemList) {
            this.itemList = [...this.itemList, modal.content.createdItem]
            this.fields['itemId'].setValue(modal.content.createdItem.id)
          }
        })
    }
  }
}
