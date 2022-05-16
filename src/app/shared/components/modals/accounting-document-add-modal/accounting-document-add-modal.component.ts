import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { first } from 'rxjs/internal/operators/first';
import { ICreateAccountingDocument } from 'src/app/shared/models/accounting-document/accounting-document-create.model';
import { IAccountingDocument } from 'src/app/shared/models/accounting-document/accounting-document.model';
import { ISimpleGroup } from 'src/app/shared/models/group/group-simple.model';
import { ISimpleProject } from 'src/app/shared/models/project/project-simple.model';
import { AccountingDocumentService } from 'src/app/shared/services/accounting-document.service';
import { GroupService } from 'src/app/shared/services/group.service';

@Component({
  selector: 'app-accounting-document-add-modal',
  templateUrl: './accounting-document-add-modal.component.html',
  styleUrls: ['./accounting-document-add-modal.component.css']
})
export class AccountingDocumentAddModalComponent implements OnInit {
  documentToCreate: ICreateAccountingDocument | undefined
  projectList: ISimpleProject[] | undefined
  groupList: ISimpleGroup[] | undefined
  group: ISimpleGroup | undefined
  blockProject: boolean = false;

  documentAddForm: FormGroup
  submitted: boolean = false
  loading: boolean = false
  error: any
  errorMessage: string = ''

  createdDocument: IAccountingDocument | undefined

  constructor(
    public bsModalRef: BsModalRef,
    private formBuilder: FormBuilder,
    private groupService: GroupService,
    private accountingDocumentService: AccountingDocumentService) {
    this.documentAddForm = this.formBuilder.group({})
  }

  ngOnInit(): void {
    this.bsModalRef.setClass('modal-lg')

    this.documentAddForm = this.formBuilder.group({
      name: ['', Validators.required],
      filePath: ['empty', Validators.required],
      project: [this.documentToCreate?.projectId],
      group: [this.documentToCreate?.groupId, Validators.required]
    })

    if (this.documentToCreate && this.documentToCreate.groupId) {
      this.groupService.getGroup(this.documentToCreate.groupId).subscribe(g => {
        this.groupList = [g]
        this.documentAddForm.controls['group'].setValue(g.id)
        this.documentAddForm.controls['group'].disable()
      })
    }

    this.refreshProjectList()
  }

  refreshProjectList(): void {
    if (this.documentToCreate && this.documentToCreate.groupId) {
      // project list
      this.groupService.getProjects(this.documentToCreate.groupId).subscribe(p => {
        this.projectList = p;
        if (this.documentToCreate?.projectId) {
          this.projectList = this.projectList.filter(p => p.id === this.documentToCreate?.projectId)

          if (this.blockProject) {
            this.documentAddForm.controls['project'].setValue(this.documentToCreate.projectId)
            this.documentAddForm.controls['project'].disable()
          }
        }
      })
      this.groupService.getGroup(this.documentToCreate.groupId).subscribe(g => {
        if (g.relatedProject) {
          this.projectList?.push(g.relatedProject)
        }

        this.documentAddForm.controls['project'].setValue(undefined)
      })
    }
  }

  get fields() { return this.documentAddForm.controls }

  onSubmit(): void {

    this.submitted = true;

    // stop here if form is invalid
    if (this.documentAddForm.invalid) {
      console.log(this.documentAddForm)
      return;
    }

    this.loading = true;

    if (this.documentToCreate) {
      this.documentToCreate.name = this.fields['name'].value
      this.documentToCreate.filePath = this.fields['filePath'].value
      this.documentToCreate.groupId = this.fields['group'].value
      this.documentToCreate.projectId = this.fields['project'].value

      this.accountingDocumentService.CreateAccountingDocument(this.documentToCreate)
        .subscribe({
          next: (d) => {
            this.createdDocument = d
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

}
