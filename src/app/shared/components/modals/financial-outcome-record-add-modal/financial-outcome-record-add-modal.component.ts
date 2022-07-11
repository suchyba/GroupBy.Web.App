import { formatDate } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { first } from 'rxjs/internal/operators/first';
import { ISimpleAccountingBook } from 'src/app/shared/models/accounting-book/accounting-book-simple.model';
import { ISimpleAccountingDocument } from 'src/app/shared/models/accounting-document/accounting-document-simple.model';
import { ICreateFinancialOutcomeRecord } from 'src/app/shared/models/financial-record/financial-outcome-record-create.modal';
import { ISimpleGroup } from 'src/app/shared/models/group/group-simple.model';
import { ISimpleProject } from 'src/app/shared/models/project/project-simple.model';
import { AccountingDocumentService } from 'src/app/shared/services/accounting-document.service';
import { FinancialOutcomeRecordService } from 'src/app/shared/services/financial-outcome-record.service';
import { GroupService } from 'src/app/shared/services/group.service';
import { DocumentAddModalComponent } from '../document-add-modal/document-add-modal.component';

@Component({
  templateUrl: './financial-outcome-record-add-modal.component.html',
  styleUrls: ['./financial-outcome-record-add-modal.component.css']
})
export class FinancialOutcomeRecordAddModalComponent implements OnInit {
  @Input() recordToCreate: ICreateFinancialOutcomeRecord | undefined
  public projectList: ISimpleProject[] | undefined
  public documentList: ISimpleAccountingDocument[] | undefined

  public accountingBookList: ISimpleAccountingBook[] | undefined
  public distinctBookId: number[] | undefined
  public distinctBookOrderNumber: number[] | undefined
  public group: ISimpleGroup | undefined

  public recordAddForm: FormGroup
  public submitted: boolean = false
  public loading: boolean = false
  public error: any
  public errorMessage: string = ''

  constructor(
    public bsModalRef: BsModalRef,
    private modalService: BsModalService,
    private formBuilder: FormBuilder,
    private groupService: GroupService,
    private accountingDocumentService: AccountingDocumentService,
    private financialOutcomeRecordService: FinancialOutcomeRecordService,
    private toastrService: ToastrService) {
    this.recordAddForm = this.formBuilder.group({})
  }

  ngOnInit(): void {
    this.bsModalRef.setClass('modal-lg')

    this.recordAddForm = this.formBuilder.group({
      bookId: [this.recordToCreate?.bookId, Validators.required],
      bookOrderNumber: [this.recordToCreate?.bookOrderNumberId, Validators.required],
      description: ['', Validators.required],
      relatedProject: [this.recordToCreate?.relatedProjectId],
      relatedDocument: [this.recordToCreate?.relatedDocumentId, Validators.required],
      date: [formatDate(new Date(), 'yyyy-MM-dd', 'en'), Validators.required],
      inventory: [0],
      material: [0],
      service: [0],
      transport: [0],
      insurance: [0],
      accommodation: [0],
      salary: [0],
      food: [0],
      other: [0],
    })

    if (this.recordToCreate && this.group) {
      // project list
      this.groupService.getProjects(this.group.id).subscribe(p => {
        this.projectList = p;
        if (this.recordToCreate?.relatedProjectId)
          this.projectList = this.projectList.filter(p => p.id === this.recordToCreate?.relatedProjectId)
      })
      this.groupService.getGroup(this.group.id).subscribe(g => {
        // project list
        if (g.relatedProject)
          this.projectList?.push(g.relatedProject)

        if (g.relatedProject && !this.recordToCreate?.relatedProjectId) {
          // set related project as default
          if (this.recordToCreate)
            this.recordAddForm.controls['relatedProject'].setValue(g.relatedProject.id)
        }
        else if (this.recordToCreate?.relatedProjectId) {
          this.recordAddForm.controls['relatedProject'].setValue(this.recordToCreate?.relatedProjectId)
          this.recordAddForm.controls['relatedProject'].disable()
        }
        else
          this.recordAddForm.controls['relatedProject'].setValue(undefined)

        // accounting book list
        this.groupService.getAccountingBooks(g.id).subscribe(books => {
          // only unlocked books
          books = books.filter(b => !b.locked)

          this.accountingBookList = books
          this.distinctBookId = books.map(b => b.bookId).filter((v, i, s) => s.indexOf(v) === i)
          this.onBookIdChange(this.recordToCreate?.bookId)

          if (this.recordToCreate?.bookId) {
            this.recordAddForm.controls['bookId'].disable()
            this.recordAddForm.controls['bookId'].setValue(this.recordToCreate.bookId)
          }
          if (this.recordToCreate?.bookOrderNumberId) {
            this.recordAddForm.controls['bookOrderNumber'].setValue(this.recordToCreate.bookOrderNumberId)
          }
          this.recordAddForm.controls['bookOrderNumber'].disable()
        })
      })

      // document list
      this.groupService.getAccountingDocuments(this.group.id, this.recordToCreate.relatedProjectId).subscribe(d => {
        this.documentList = d
      })
    }

  }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.recordAddForm.invalid) {
      return;
    }

    this.loading = true;

    if (this.recordToCreate) {
      this.recordToCreate.bookId = this.fields['bookId'].value
      this.recordToCreate.bookOrderNumberId = this.fields['bookOrderNumber'].value
      this.recordToCreate.relatedDocumentId = this.fields['relatedDocument'].value
      this.recordToCreate.relatedProjectId = this.fields['relatedProject'].value
      this.recordToCreate.date = this.fields['date'].value
      this.recordToCreate.description = this.fields['description'].value
      this.recordToCreate.inventory = this.fields['inventory'].value
      this.recordToCreate.material = this.fields['material'].value
      this.recordToCreate.service = this.fields['service'].value
      this.recordToCreate.transport = this.fields['transport'].value
      this.recordToCreate.insurance = this.fields['insurance'].value
      this.recordToCreate.accommodation = this.fields['accommodation'].value
      this.recordToCreate.salary = this.fields['salary'].value
      this.recordToCreate.food = this.fields['food'].value
      this.recordToCreate.other = this.fields['other'].value

      this.financialOutcomeRecordService.CreateFinancialIncomeRecord(this.recordToCreate).pipe(first())
        .subscribe({
          complete: () => {
            this.toastrService.success('Successfully created financial outcome record')
            this.bsModalRef.hide()
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

  public onRelatedDocumentChange(): void {
    if (this.fields['relatedDocument'].value) {
      this.accountingDocumentService.GetAccountingDocument(this.fields['relatedDocument'].value).subscribe(d => {
        if (d.relatedProject) {
          this.fields['relatedProject'].disable()
          this.fields['relatedProject'].setValue(d.relatedProject.id)
        }
        else if (!this.recordToCreate?.relatedProjectId) {
          this.fields['relatedProject'].enable()
        }
      })
    }
  }

  public onBookIdChange(currBookId: number | undefined): void {
    if (currBookId) {
      this.distinctBookOrderNumber = this.accountingBookList
        ?.filter(b => b.bookId === currBookId)
        .map(b => b.bookOrderNumberId)
        .filter((v, i, s) => s.indexOf(v) === i)

      this.fields['bookOrderNumber'].setValue(undefined)
      this.fields['bookOrderNumber'].enable()
    }
  }

  get fields() { return this.recordAddForm.controls }

  openAccountingDocumentAddModal(): void {
    if (this.group) {
      let modal = this.modalService.show(DocumentAddModalComponent, {
        initialState: {
          documentToCreate: {
            name: "",
            filePath: "null",
            groupsId: [this.group.id],
            projectId: this.recordToCreate?.relatedProjectId
          },
          isAccountingDocument: true
        }
      })
      if (modal.onHidden)
        modal.onHidden.subscribe(() => {
          if (modal.content?.createdDocument && this.documentList) {
            this.documentList.push(modal.content.createdDocument)
            this.fields['relatedDocument'].setValue(modal.content.createdDocument.id)
            this.onRelatedDocumentChange()
          }
        })
    }
  }

  public getCurrAccBookName(): string {
    if (this.fields['bookId'].value && this.fields['bookOrderNumber'].value) {
      return this.accountingBookList?.find(b => b.bookId === this.fields['bookId'].value && b.bookOrderNumberId === this.fields['bookOrderNumber'].value)?.name ?? ''
    }
    else
      return ''
  }
}
