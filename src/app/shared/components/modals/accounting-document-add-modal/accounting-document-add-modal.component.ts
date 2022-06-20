import { Component, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { first } from 'rxjs/internal/operators/first';
import { ICreateAccountingDocument } from 'src/app/shared/models/accounting-document/accounting-document-create.model';
import { IAccountingDocument } from 'src/app/shared/models/accounting-document/accounting-document.model';
import { ISimpleGroup } from 'src/app/shared/models/group/group-simple.model';
import { ISimpleProject } from 'src/app/shared/models/project/project-simple.model';
import { AccountingDocumentService } from 'src/app/shared/services/accounting-document.service';
import { GroupService } from 'src/app/shared/services/group.service';

@Component({
  templateUrl: './accounting-document-add-modal.component.html',
  styleUrls: ['./accounting-document-add-modal.component.css']
})
export class AccountingDocumentAddModalComponent implements OnInit {
  @Input() documentToCreate: ICreateAccountingDocument | undefined
  @Output() createdDocument: IAccountingDocument | undefined
  
  public projectList: ISimpleProject[] | undefined
  public groupList: ISimpleGroup[] | undefined
  public group: ISimpleGroup | undefined
  public blockProject: boolean = false;

  public documentAddForm: FormGroup
  public submitted: boolean = false
  public loading: boolean = false
  public error: any
  public errorMessage: string = ''

  constructor(
    public bsModalRef: BsModalRef,
    private formBuilder: FormBuilder,
    private groupService: GroupService,
    private accountingDocumentService: AccountingDocumentService,
    private toastrService: ToastrService) {
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
        
        if (!this.blockProject)
          this.documentAddForm.controls['project'].setValue(undefined)
      })
    }
  }

  get fields() { return this.documentAddForm.controls }

  onSubmit(): void {

    this.submitted = true;

    // stop here if form is invalid
    if (this.documentAddForm.invalid) {
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
            this.toastrService.success(`Successfully created ${d.name} accounting document`)
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
