import { formatDate } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { startWith } from 'rxjs/operators';
import { ISimpleGroup } from 'src/app/shared/models/group/group-simple.model';
import { ITransferInventoryBookRecord } from 'src/app/shared/models/inventory-book-record/inventory-book-record-transfer.model';
import { ISimpleInventoryBook } from 'src/app/shared/models/inventory-book/inventory-book-simple.model';
import { ISimpleInventoryItemSource } from 'src/app/shared/models/inventory-item-source/inventory-item-source-simple.model';
import { ISimpleInventoryItem } from 'src/app/shared/models/inventory-item/inventory-item-simple.model';
import { DocumentService } from 'src/app/shared/services/document.service';
import { GroupService } from 'src/app/shared/services/group.service';
import { InventoryBookRecordService } from 'src/app/shared/services/inventory-book-record.service';
import { InventoryBookService } from 'src/app/shared/services/inventory-book.service';
import { InventoryItemSourceService } from 'src/app/shared/services/inventory-item-source.service';
import { InventoryItemService } from 'src/app/shared/services/inventory-item.service';

@Component({
  selector: 'app-inventory-book-record-transfer-modal',
  templateUrl: './inventory-book-record-transfer-modal.component.html',
  styleUrls: ['./inventory-book-record-transfer-modal.component.css']
})
export class InventoryBookRecordTransferModalComponent implements OnInit {
  @Input() recordToCreate: ITransferInventoryBookRecord | undefined
  @Input() inventoryBookFrom: ISimpleInventoryBook | undefined
  @Input() groupFrom: ISimpleGroup | undefined

  public inventoryBookFromList: ISimpleInventoryBook[] = []
  public inventoryBookToList: ISimpleInventoryBook[] = []
  public itemList: ISimpleInventoryItem[] = []
  public sourceList: ISimpleInventoryItemSource[] = []

  public sourcesLinked: boolean = true
  public linkingSourcesDisabled = false

  public filteredGroupList: ISimpleGroup[] = []
  public groupList: ISimpleGroup[] = []
  public selectedGroup: ISimpleGroup | undefined
  public noGroupResults = false

  public recordAddForm: FormGroup
  public submitted: boolean = false
  public loading: boolean = false
  public error: any
  public errorMessage: string = ''

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

  get fields() { return this.recordAddForm.controls }

  private filterGroup(value: string): ISimpleGroup[] {
    return this.groupList
      .filter((g: ISimpleGroup) => g.name.toLowerCase().includes(value.toLowerCase()));
  }

  onSelectGroup(group: ISimpleGroup) {
    this.selectedGroup = group
  }

  ngOnInit(): void {
    this.modalRef.setClass('modal-lg')

    this.recordAddForm = this.formBuilder.group({
      inventoryBookFromId: [this.recordToCreate?.inventoryBookFromId, Validators.required],
      groupToId: ['', Validators.required],
      document: [this.recordToCreate?.documentName, Validators.required],
      itemId: [this.recordToCreate?.itemId, Validators.required],
      sourceFromId: [this.recordToCreate?.sourceFromId, Validators.required],
      sourceToId: [this.recordToCreate?.sourceToId, Validators.required],
      date: [formatDate(this.recordToCreate?.date ?? new Date(), 'yyyy-MM-dd', 'en'), Validators.required]
    })

    // typeahead filtering
    this.recordAddForm.controls['groupToId'].valueChanges.pipe(startWith(''))
      .subscribe((value: string) => {
        this.filteredGroupList = this.filterGroup(value)
      })

    this.recordAddForm.controls['sourceFromId'].valueChanges.subscribe(value => {
      if (this.sourcesLinked) {
        this.recordAddForm.controls['sourceToId'].setValue(value)
      }
    })

    if (!this.groupFrom) {
      if (this.recordToCreate?.inventoryBookFromId) {
        this.inventoryBookService.getInventoryBook(this.recordToCreate.inventoryBookFromId).subscribe(book => {
          this.groupFrom = book.relatedGroup
          this.loadLists()
        })
      }
    }
    else {
      this.loadLists()
    }
  }

  private loadLists() {
    if (this.recordToCreate) {
      // From inventory book
      if (this.recordToCreate.inventoryBookFromId) {
        if (this.inventoryBookFrom && this.inventoryBookFrom.id === this.recordToCreate.inventoryBookFromId) {
          this.inventoryBookFromList = [this.inventoryBookFrom];

          this.recordAddForm.controls['inventoryBookFromId'].disable();
        }
        else {
          this.inventoryBookService.getInventoryBook(this.recordToCreate.inventoryBookFromId).subscribe(book => {
            this.inventoryBookFromList = [book];

            this.recordAddForm.controls['inventoryBookFromId'].disable();
          });
        }
      }
      else {
      }

      // Item
      if (this.recordToCreate.itemId) {
        if (this.recordToCreate.inventoryBookFromId) {
          this.inventoryBookService.getItems(this.recordToCreate.inventoryBookFromId).subscribe(items => {
            this.itemList = items.filter(i => i.id === this.recordToCreate?.itemId);
            this.recordAddForm.controls['itemId'].disable()
          });
        }
      }
      else {
        if (this.recordToCreate.inventoryBookFromId) {
          this.inventoryBookService.getItems(this.recordToCreate.inventoryBookFromId).subscribe(items => {
            this.itemList = [...items];
          });
        }
        else {

        }
      }

      // Source from and to
      this.inventoryItemSourceService.getAllInventoryItemSource().subscribe(sources => {
        this.sourceList = [...sources];
        if (this.recordToCreate?.sourceFromId) {
          this.recordAddForm.controls['sourceFromId'].disable();
          this.linkingSourcesDisabled = true;
          this.sourcesLinked = false;
        }
        if (this.recordToCreate?.inventoryBookToId) {
          this.recordAddForm.controls['sourceToId'].disable();
          this.linkingSourcesDisabled = true;
          this.sourcesLinked = false;
        }

        if (!this.recordToCreate?.sourceFromId && !this.recordToCreate?.inventoryBookToId) {
          this.recordAddForm.controls['sourceToId'].disable();
          this.linkingSourcesDisabled = false;
          this.sourcesLinked = true;
        }

      });
    }
    // destination group list
    this.groupService.getAllGroups().subscribe(allGroups => {
      this.groupList = allGroups.filter(g => g.hasInventoryBook && g.id !== this.groupFrom?.id)
      this.filteredGroupList = this.groupList
    })

  }

  onSubmit(): void {
    this.submitted = true;

    // stop here if form is invalid
    if (this.recordAddForm.invalid) {
      return;
    }

    this.loading = true;
    if (this.selectedGroup) {
      this.groupService.getGroup(this.selectedGroup?.id).subscribe(g => {
        this.inventoryBookRecordService.transferItem({
          inventoryBookFromId: this.recordAddForm.controls['inventoryBookFromId'].value,
          date: this.recordAddForm.controls['date'].value,
          documentName: this.recordAddForm.controls['document'].value,
          sourceFromId: this.recordAddForm.controls['sourceFromId'].value,
          sourceToId: this.recordAddForm.controls['sourceToId'].value,
          itemId: this.recordAddForm.controls['itemId'].value,
          inventoryBookToId: g.inventoryBook?.id
        }).subscribe({
          complete: () => {
            this.toastrService.success(`Successfully transfered item`)
            this.modalRef.hide()
          },
          error: (error) => {
            this.error = error;
            if (error?.id)
              this.errorMessage = error.message
            this.loading = false;
          }
        })
      })
    }

  }

  onCancel(): void {
    this.modalRef.hide()
  }

  onSourceLinkClick(): void {
    this.sourcesLinked = !this.sourcesLinked

    if (this.sourcesLinked) {
      this.recordAddForm.controls['sourceToId'].disable()
      this.recordAddForm.controls['sourceToId'].setValue(this.recordAddForm.controls['sourceFromId'].value)
    }
    else {
      this.recordAddForm.controls['sourceToId'].enable()
    }
  }

  noResultsEvent(isNoResults: boolean): void {
    this.noGroupResults = isNoResults
  }
}
