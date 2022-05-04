import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { first } from 'rxjs/internal/operators/first';
import { ISimpleAccountingDocument } from 'src/app/shared/models/accounting-document/accounting-document-simple.model';
import { ICreateFinancialOutcomeRecord } from 'src/app/shared/models/financial-record/financial-outcome-record-create.modal';
import { ISimpleGroup } from 'src/app/shared/models/group/group-simple.model';
import { ISimpleProject } from 'src/app/shared/models/project/project-simple.model';
import { AccountingDocumentService } from 'src/app/shared/services/accounting-document.service';
import { FinancialOutcomeRecordService } from 'src/app/shared/services/financial-outcome-record.service';
import { GroupService } from 'src/app/shared/services/group.service';
import { AccountingDocumentAddModalComponent } from '../accounting-document-add-modal/accounting-document-add-modal.component';

@Component({
  selector: 'app-financial-outcome-record-add-modal',
  templateUrl: './financial-outcome-record-add-modal.component.html',
  styleUrls: ['./financial-outcome-record-add-modal.component.css']
})
export class FinancialOutcomeRecordAddModalComponent implements OnInit {
  recordToCreate: ICreateFinancialOutcomeRecord | undefined
  projectList: ISimpleProject[] | undefined
  documentList: ISimpleAccountingDocument[] | undefined
  public group: ISimpleGroup | undefined

  recordAddForm: FormGroup
  submitted: boolean = false
  loading: boolean = false
  error: any
  errorMessage: string = ''

  constructor(
    public bsModalRef: BsModalRef,
    private modalService: BsModalService,
    private formBuilder: FormBuilder,
    private groupService: GroupService,
    private accountingDocumentService: AccountingDocumentService,
    private financialOutcomeRecordService: FinancialOutcomeRecordService) {
    this.recordAddForm = this.formBuilder.group({})
  }

  ngOnInit(): void {
    this.bsModalRef.setClass('modal-lg')

    this.recordAddForm = this.formBuilder.group({
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
        if (g.relatedProject) {
          this.projectList?.push(g.relatedProject)

          // set related project as default
          if (this.recordToCreate)
            this.recordAddForm.controls['relatedProject'].setValue(g.relatedProject.id)
        }
        else
          this.recordAddForm.controls['relatedProject'].setValue(undefined)
      })

      // document list
      this.groupService.getAccountingDocuments(this.group.id).subscribe(d => {
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
          complete: () => this.bsModalRef.hide(),
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
        else {
          this.fields['relatedProject'].enable()
        }
      })
    }
  }

  get fields() { return this.recordAddForm.controls }

  openAccountingDocumentAddModal(): void {
    if (this.group) {
      let modal = this.modalService.show(AccountingDocumentAddModalComponent, {
        initialState: {
          documentToCreate: {
            name: "",
            filePath: "null",
            groupId: this.group?.id,
            projectId: undefined
          }
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
}
