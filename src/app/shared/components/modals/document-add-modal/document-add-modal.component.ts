import { Component, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { first } from 'rxjs/internal/operators/first';
import { ICreateAccountingDocument } from 'src/app/shared/models/accounting-document/accounting-document-create.model';
import { IAccountingDocument } from 'src/app/shared/models/accounting-document/accounting-document.model';
import { ICreateDocument } from 'src/app/shared/models/document/document-create.model';
import { IDocument } from 'src/app/shared/models/document/document.model';
import { ISimpleGroup } from 'src/app/shared/models/group/group-simple.model';
import { ISimpleProject } from 'src/app/shared/models/project/project-simple.model';
import { AccountingDocumentService } from 'src/app/shared/services/accounting-document.service';
import { DocumentService } from 'src/app/shared/services/document.service';
import { GroupService } from 'src/app/shared/services/group.service';

@Component({
  templateUrl: './document-add-modal.component.html',
  styleUrls: ['./document-add-modal.component.css']
})
export class DocumentAddModalComponent implements OnInit {
  @Input() documentToCreate: ICreateDocument | undefined
  @Input() isAccountingDocument: boolean | undefined

  @Output() createdDocument: IAccountingDocument | IDocument | undefined
  
  public projectList: ISimpleProject[] | undefined
  public groupList: ISimpleGroup[] | undefined
  public group: ISimpleGroup | undefined
  public blockProject: boolean = false;

  public documentAddForm: FormGroup
  public submitted: boolean = false
  public loading: boolean = false
  public error: any
  public errorMessage: string = ''

  get blockAccountingDocument() {
    return this.isAccountingDocument !== undefined
  }

  constructor(
    public bsModalRef: BsModalRef,
    private formBuilder: FormBuilder,
    private groupService: GroupService,
    private accountingDocumentService: AccountingDocumentService,
    private documentService: DocumentService,
    private toastrService: ToastrService) {
    this.documentAddForm = this.formBuilder.group({})
  }

  ngOnInit(): void {
    this.bsModalRef.setClass('modal-lg')

    this.documentAddForm = this.formBuilder.group({
      name: ['', Validators.required],
      filePath: ['empty', Validators.required],
      project: [this.documentToCreate?.relatedProjectId],
      group: [this.documentToCreate?.groupsId[0], Validators.required],
      accountingDocument: [{value: this.isAccountingDocument, disabled: this.blockAccountingDocument}]
    })

    if (this.documentToCreate && this.documentToCreate.groupsId[0]) {
      this.groupService.getGroup(this.documentToCreate.groupsId[0]).subscribe(g => {
        this.groupList = [{
          description: g.description,
          id: g.id,
          name: g.name,
          hasInventoryBook: g.inventoryBook !== null
        }]
        this.documentAddForm.controls['group'].setValue(g.id)
        this.documentAddForm.controls['group'].disable()
      })
    }

    this.refreshProjectList()
  }

  refreshProjectList(): void {
    if (this.documentToCreate && this.documentToCreate.groupsId) {
      // project list
      this.groupService.getProjects(this.documentToCreate.groupsId[0]).subscribe(p => {
        this.projectList = p;
        if (this.documentToCreate?.relatedProjectId) {
          this.projectList = this.projectList.filter(p => p.id === this.documentToCreate?.relatedProjectId)

          if (this.blockProject) {
            this.documentAddForm.controls['project'].setValue(this.documentToCreate.relatedProjectId)
            this.documentAddForm.controls['project'].disable()
          }
        }
      })
      this.groupService.getGroup(this.documentToCreate.groupsId[0]).subscribe(g => {
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
      this.documentToCreate.groupsId = [this.fields['group'].value]
      this.documentToCreate.relatedProjectId = this.fields['project'].value

      if (this.documentAddForm.controls['accountingDocument'].value) {
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
      else {
        this.documentService.createDocument(this.documentToCreate)
          .subscribe({
            next: (d) => {
              this.createdDocument = d
              this.toastrService.success(`Successfully created ${d.name} document`)
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

}
