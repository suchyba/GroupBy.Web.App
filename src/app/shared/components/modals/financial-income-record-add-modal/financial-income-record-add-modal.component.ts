import { formatDate } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { first } from 'rxjs/internal/operators/first';
import { ISimpleAccountingBook } from 'src/app/shared/models/accounting-book/accounting-book-simple.model';
import { ISimpleAccountingDocument } from 'src/app/shared/models/accounting-document/accounting-document-simple.model';
import { ICreateFinancialIncomeRecord } from 'src/app/shared/models/financial-record/financial-income-record-create.model';
import { ISimpleGroup } from 'src/app/shared/models/group/group-simple.model';
import { ISimpleProject } from 'src/app/shared/models/project/project-simple.model';
import { AccountingDocumentService } from 'src/app/shared/services/accounting-document.service';
import { FinancialIncomeRecordService } from 'src/app/shared/services/financial-income-record.service';
import { GroupService } from 'src/app/shared/services/group.service';
import { DocumentAddModalComponent } from '../document-add-modal/document-add-modal.component';

@Component({
  selector: 'app-financial-income-record-add-modal',
  templateUrl: './financial-income-record-add-modal.component.html',
  styleUrls: ['./financial-income-record-add-modal.component.css']
})
export class FinancialIncomeRecordAddModalComponent implements OnInit {
  @Input() recordToCreate: ICreateFinancialIncomeRecord | undefined
  @Input() bookIdentificator: number | undefined
  @Input() bookOrderNumber: number | undefined

  public projectList: ISimpleProject[] | undefined
  public documentList: ISimpleAccountingDocument[] | undefined

  public accountingBookList: ISimpleAccountingBook[] | undefined
  public distinctBookIdentificator: number[] | undefined
  public distinctBookOrderNumber: number[] | undefined
  public group: ISimpleGroup | undefined

  public recordAddForm: UntypedFormGroup
  public submitted: boolean = false
  public loading: boolean = false
  public error: any
  public errorMessage: string = ''

  constructor(
    public bsModalRef: BsModalRef,
    private modalService: BsModalService,
    private formBuilder: UntypedFormBuilder,
    private groupService: GroupService,
    private accountingDocumentService: AccountingDocumentService,
    private financialIncomeRecordService: FinancialIncomeRecordService,
    private toastrService: ToastrService) {
    this.recordAddForm = this.formBuilder.group({})
  }

  ngOnInit(): void {
    this.bsModalRef.setClass('modal-lg')

    this.recordAddForm = this.formBuilder.group({
      bookIdentificator: [this.bookIdentificator, Validators.required],
      bookOrderNumber: [this.bookOrderNumber, Validators.required],
      bookId: [this.recordToCreate?.bookId, Validators.required],
      description: ['', Validators.required],
      relatedProject: [this.recordToCreate?.relatedProjectId],
      relatedDocument: [this.recordToCreate?.relatedDocumentId, Validators.required],
      date: [formatDate(new Date(), 'yyyy-MM-dd', 'en'), Validators.required],
      membershipFee: [0],
      programFee: [0],
      dotation: [0],
      earningAction: [0],
      onePercent: [0],
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
          this.distinctBookIdentificator = books.map(b => b.bookIdentificator).filter((v, i, s) => s.indexOf(v) === i)

          // supplied book
          if (this.recordToCreate?.bookId) {
            let book = this.accountingBookList.filter(b => b.id === this.recordToCreate?.bookId)[0]
            this.bookIdentificator = book.bookIdentificator
            this.bookOrderNumber = book.bookOrderNumberId
          }

          // supplied only part of the book id
          if (this.bookIdentificator) {
            this.recordAddForm.controls['bookIdentificator'].disable()
            this.recordAddForm.controls['bookIdentificator'].setValue(this.bookIdentificator)
          }
          this.recordAddForm.controls['bookOrderNumber'].disable()
          this.onBookIdChange(this.bookIdentificator)
          
          if (this.bookOrderNumber) {
            this.recordAddForm.controls['bookOrderNumber'].setValue(this.bookOrderNumber)
            this.recordAddForm.controls['bookOrderNumber'].disable()
          }
          
          this.onBookOrderNumberChange(this.bookOrderNumber)
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
      this.recordToCreate.relatedDocumentId = this.fields['relatedDocument'].value
      this.recordToCreate.relatedProjectId = this.fields['relatedProject'].value
      this.recordToCreate.date = this.fields['date'].value
      this.recordToCreate.description = this.fields['description'].value
      this.recordToCreate.dotation = this.fields['dotation'].value
      this.recordToCreate.earningAction = this.fields['earningAction'].value
      this.recordToCreate.membershipFee = this.fields['membershipFee'].value
      this.recordToCreate.onePercent = this.fields['onePercent'].value
      this.recordToCreate.other = this.fields['other'].value
      this.recordToCreate.programFee = this.fields['programFee'].value

      this.financialIncomeRecordService.CreateFinancialIncomeRecord(this.recordToCreate).pipe(first())
        .subscribe({
          complete: () => {
            this.toastrService.success('Successfully created financial income record')
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

  public onBookIdChange(currBookIdentificator: number | undefined): void {
    if (currBookIdentificator) {
      this.distinctBookOrderNumber = this.accountingBookList
        ?.filter(b => b.bookIdentificator === currBookIdentificator)
        .map(b => b.bookOrderNumberId)
        .filter((v, i, s) => s.indexOf(v) === i)

      this.onBookOrderNumberChange(undefined)
      this.fields['bookOrderNumber'].setValue(undefined)
      this.fields['bookOrderNumber'].enable()
    }
  }

  public onBookOrderNumberChange(currBookOrderNumber: number | undefined): void {
    if (currBookOrderNumber && this.recordToCreate) {
      this.recordToCreate.bookId = this.accountingBookList
      ?.filter(b => b.bookIdentificator === this.fields['bookIdentificator'].value && b.bookOrderNumberId === currBookOrderNumber)
      .map(b => b.id)[0]

      this.fields['bookId'].setValue(this.recordToCreate?.bookId)
    }
    else if (this.recordToCreate) {
      this.recordToCreate.bookId = undefined
      
      this.fields['bookId'].setValue(this.recordToCreate?.bookId)
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
            groupsId: [this.group?.id],
            relatedProjectId: this.recordToCreate?.relatedProjectId
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
      return this.accountingBookList?.find(b => b.id === this.fields['bookId'].value)?.name ?? ''
    }
    else
      return ''
  }
}
