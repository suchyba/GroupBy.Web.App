import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { ISimpleGroup } from 'src/app/shared/models/group/group-simple.model';
import { ICreateInventoryBook } from 'src/app/shared/models/inventory-book/inventory-book-create.model';
import { ISimpleInventoryBook } from 'src/app/shared/models/inventory-book/inventory-book-simple.model';
import { GroupService } from 'src/app/shared/services/group.service';
import { InventoryBookService } from 'src/app/shared/services/inventory-book.service';
import { VolunteerService } from 'src/app/shared/services/volunteer.service';

@Component({
  templateUrl: './inventory-book-add-modal.component.html',
  styleUrls: ['./inventory-book-add-modal.component.css']
})
export class InventoryBookAddModalComponent implements OnInit {
  @Input() bookToCreate: ICreateInventoryBook | undefined
  @Input() group: ISimpleGroup | undefined
  @Input() volunteerId: number | undefined

  @Output() createdBook: ISimpleInventoryBook | undefined
  @Output() bookCreatedEvent: EventEmitter<ISimpleInventoryBook> = new EventEmitter<ISimpleInventoryBook>()

  public groupList: ISimpleGroup[] = []

  public bookAddForm: FormGroup
  public submitted: boolean = false
  public loading: boolean = false
  public error: any
  public errorMessage: string = ''

  get fields() { return this.bookAddForm.controls }

  constructor(
    private inventoryBookService: InventoryBookService,
    private groupService: GroupService,
    private volunteerService: VolunteerService,
    private formBuilder: FormBuilder,
    private toastrService: ToastrService,
    public modalRef: BsModalRef
  ) {
    this.bookAddForm = formBuilder.group({});
  }

  ngOnInit(): void {
    this.modalRef.setClass('modal-lg')
    this.bookAddForm = this.formBuilder.group({
      name: [this.bookToCreate?.name, Validators.required],
      relatedGroupId: [this.bookToCreate?.relatedGroupId, Validators.required]
    })

    if (this.bookToCreate) {
      if (this.group && this.bookToCreate.relatedGroupId === this.group.id) {
        this.groupList = [this.group]
      }
      else {
        this.groupService.getGroup(this.bookToCreate.relatedGroupId).subscribe(apiGroup => {
          this.groupList = [{
            id: apiGroup.id,
            name: apiGroup.name,
            description: apiGroup.description,
            hasInventoryBook: apiGroup.inventoryBook !== null
          }]
        })
      }
      this.bookAddForm.controls['relatedGroupId'].disable()
    }
    else if (this.volunteerId) {
      this.volunteerService.getOwnedGroups(this.volunteerId).subscribe(groups => {
        this.groupList = [...groups]
      })
    }
  }

  onSubmit(): void {
    this.submitted = true

    // stop here if form is invalid
    if (this.bookAddForm.invalid) {
      return;
    }

    this.loading = true;

    const book: ICreateInventoryBook = {
      name: this.bookAddForm.controls['name'].value,
      relatedGroupId: this.bookAddForm.controls['relatedGroupId'].value
    }

    this.inventoryBookService.addInventoryBook(book).subscribe({
      next: (apiBook) => {
        this.createdBook = apiBook
      },
      complete: () => {
        this.toastrService.success(`Successfully created ${book.name} inventory book`)
        this.modalRef.hide()
        this.bookCreatedEvent.emit(this.createdBook)
      },
      error: (error) => {
        this.error = error;
        if (error?.id)
          this.errorMessage = error.message
        this.loading = false;
      }
    })

  }

}
