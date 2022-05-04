import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { first } from 'rxjs';
import { AuthService } from 'src/app/shared/auth/auth.service';
import { ICreateAccountingBook } from 'src/app/shared/models/accounting-book/accounting-book-create.model';
import { ISimpleGroup } from 'src/app/shared/models/group/group-simple.model';
import { AccountingBookService } from 'src/app/shared/services/accounting-book.service';
import { GroupService } from 'src/app/shared/services/group.service';
import { VolunteerService } from 'src/app/shared/services/volunteer.service';

@Component({
  selector: 'app-accounting-book-add-modal',
  templateUrl: './accounting-book-add-modal.component.html',
  styleUrls: ['./accounting-book-add-modal.component.css']
})
export class AccountingBookAddModalComponent implements OnInit {
  bookToCreate: ICreateAccountingBook | undefined
  groupList: ISimpleGroup[] | undefined

  accountingBookAddForm: FormGroup
  submitted: boolean = false
  loading: boolean = false
  error: any
  errorMessage: string = ''

  constructor(
    public bsModalRef: BsModalRef,
    private accountingBookService: AccountingBookService,
    private formBuilder: FormBuilder,
    private groupService: GroupService,
    private authService: AuthService,
    private volunteerService: VolunteerService) {

    this.accountingBookAddForm = this.formBuilder.group({})
  }

  ngOnInit(): void {
    this.bsModalRef.setClass('modal-lg')

    this.accountingBookAddForm = this.formBuilder.group({
      book: [this.bookToCreate?.bookId, Validators.required],
      bookOrderNumber: [this.bookToCreate?.bookOrderNumberId, Validators.required],
      name: ['', Validators.required],
      locked: [this.bookToCreate?.locked ?? false, Validators.required],
      relatedGroup: [this.bookToCreate?.relatedGroupId, Validators.required]
    })

    // loading group list
    if (this.bookToCreate) {
      // group preset - blocking control
      if (this.bookToCreate.relatedGroupId) {
        this.groupService.getGroup(this.bookToCreate.relatedGroupId).subscribe(g => {
          this.groupList = [g]
          this.accountingBookAddForm.controls['relatedGroup'].disable()
        })
      }
      // group not preset - getting groups owned by volunteer
      else {
        let volunteerId = this.authService.getUserId()
        if (volunteerId) {
          this.volunteerService.getOwnedGroups(volunteerId).subscribe(g => {
            this.groupList = g
            this.accountingBookAddForm.controls['relatedGroup'].enable()
          })
        }
      }
    }
  }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.accountingBookAddForm.invalid) {
      return;
    }

    this.loading = true;

    this.accountingBookService.CreateAccountingBook({
      name: this.accountingBookAddForm.controls['name'].value,
      bookId: this.accountingBookAddForm.controls['book'].value,
      bookOrderNumberId: this.accountingBookAddForm.controls['bookOrderNumber'].value,
      locked: this.accountingBookAddForm.controls['locked'].value,
      relatedGroupId: this.accountingBookAddForm.controls['relatedGroup'].value
    }).pipe(first())
      .subscribe({
        complete: () => this.bsModalRef.hide(),
        error: (error) => {
          this.error = error;
          if (error) {
            console.log(error[""])
            this.errorMessage = error[""]
          }
          this.loading = false;
        }
      })
  }

  get fields() { return this.accountingBookAddForm.controls }
}
