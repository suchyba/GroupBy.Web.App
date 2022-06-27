import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BsModalService } from 'ngx-bootstrap/modal';
import { AuthService } from 'src/app/core/auth/auth.service';
import { DocumentAddModalComponent } from 'src/app/shared/components/modals/document-add-modal/document-add-modal.component';
import { FinancialIncomeRecordAddModalComponent } from 'src/app/shared/components/modals/financial-income-record-add-modal/financial-income-record-add-modal.component';
import { FinancialOutcomeRecordAddModalComponent } from 'src/app/shared/components/modals/financial-outcome-record-add-modal/financial-outcome-record-add-modal.component';
import { ISimpleAccountingDocument } from 'src/app/shared/models/accounting-document/accounting-document-simple.model';
import { ISimpleFinancialRecord } from 'src/app/shared/models/financial-record/financial-record-simple.model';
import { IProject } from 'src/app/shared/models/project/project.model';
import { FinancialIncomeRecordService } from 'src/app/shared/services/financial-income-record.service';
import { FinancialOutcomeRecordService } from 'src/app/shared/services/financial-outcome-record.service';
import { ProjectService } from 'src/app/shared/services/project.service';

@Component({
  selector: 'app-project-details',
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.css']
})
export class ProjectDetailsComponent implements OnInit {
  @Input() project: IProject | undefined
  public financialRecords: ISimpleFinancialRecord[] | undefined = []
  public financialRecordsTotal: number | undefined
  public volunteerId: number | undefined

  public accountingDocuments: ISimpleAccountingDocument[] | undefined | null = null
  public accountingDocumentsHidden: boolean = true

  constructor(
    private route: ActivatedRoute,
    private authService: AuthService,
    private projectService: ProjectService,
    private financialInRecordService: FinancialIncomeRecordService,
    private financialOutRecordService: FinancialOutcomeRecordService,
    private router: Router,
    private modalService: BsModalService) { }

  ngOnInit(): void {
    this.project = this.route.snapshot.data['project']
    if (this.project) {
      this.refreshFinancialRecords();
    }

    this.volunteerId = this.authService.getUserId()
  }

  private refreshFinancialRecords() {
    if (this.project) {
      this.projectService.getRelatedFinancialRecords(this.project.id).subscribe(r => {
        this.financialRecords = r
        this.financialRecordsTotal = 0
        this.financialRecords.forEach(r => {
          r.date = new Date(r.date)

          if (this.financialRecordsTotal !== undefined) {
            if (r.otherIncome !== undefined && r.otherIncome !== null)
              this.financialRecordsTotal += r.total
            else
              this.financialRecordsTotal -= r.total
          }
        });
        this.financialRecords.sort((r1, r2) => new Date(r1.date).getTime() - new Date(r2.date).getTime()).map(r => {
          r.date = new Date(r.date)
          return r;
        });
      });
    }
  }

  isOwner(): boolean {
    return this.project?.owner.id === this.volunteerId
  }

  openFinancialIncomeRecordAddModal(): void {
    let modal = this.modalService.show(FinancialIncomeRecordAddModalComponent, {
      initialState: {
        group: this.project?.projectGroup ? this.project.projectGroup : this.project?.parentGroup,
        recordToCreate: {
          bookId: undefined,
          bookOrderNumberId: undefined,
          date: new Date(),
          description: "",
          dotation: 0,
          earningAction: 0,
          membershipFee: 0,
          onePercent: 0,
          other: 0,
          programFee: 0,
          relatedDocumentId: undefined,
          relatedProjectId: this.project?.id
        }
      }
    })
    if (modal.onHidden) {
      modal.onHidden.subscribe(() => {
        this.financialRecords = undefined
        this.refreshFinancialRecords()
      })
    }
  }

  openFinancialOutcomeRecordAddModal(): void {
    let modal = this.modalService.show(FinancialOutcomeRecordAddModalComponent, {
      initialState: {
        group: this.project?.projectGroup ? this.project.projectGroup : this.project?.parentGroup,
        recordToCreate: {
          bookId: undefined,
          bookOrderNumberId: undefined,
          date: new Date(),
          description: "",
          inventory: 0,
          material: 0,
          service: 0,
          transport: 0,
          insurance: 0,
          accommodation: 0,
          salary: 0,
          food: 0,
          other: 0,
          relatedDocumentId: undefined,
          relatedProjectId: this.project?.id
        }
      }
    })
    if (modal.onHidden) {
      modal.onHidden.subscribe(() => {
        this.accountingDocuments = undefined
        this.loadAccountingDocuments()
      })
    }
  }

  openAccountingDocumentAddModal(): void {
    let groupId: number = -1;
    if (this.project)
      groupId = this.project.projectGroup?.id ? this.project.projectGroup.id : this.project.parentGroup.id

    let modal = this.modalService.show(DocumentAddModalComponent, {
      initialState: {
        documentToCreate: {
          groupId: groupId,
          name: "",
          projectId: this.project?.id,
          filePath: ""
        },
        blockProject: true
      }
    })
    if (modal.onHidden) {
      modal.onHidden.subscribe(() => {
        this.financialRecords = undefined
        this.refreshFinancialRecords()
      })
    }
  }

  loadAccountingDocuments() {
    this.accountingDocuments = undefined
    if (this.project !== undefined) {
      this.projectService.getAccountingDocuments(this.project.id).subscribe(apiAccountingDocuments => {
        this.accountingDocuments = apiAccountingDocuments
        this.accountingDocumentsHidden = false
      })
    }
  }

  hideAccountingDocuments() {
    this.accountingDocumentsHidden = true
  }

  showAccountingDocuments() {
    if (this.accountingDocuments === null)
      this.loadAccountingDocuments()
    this.accountingDocumentsHidden = false
  }

  redirectToAccountingBook(record: ISimpleFinancialRecord): void {
    if (record.otherIncome !== null) {
      this.financialInRecordService.GetFinancialIncomeRecord(record.id).subscribe(r => {
        this.router.navigate(['/accountingBooks', r.book.bookId, r.book.bookOrderNumberId])
      })
    }
    else if (record.otherOutcome !== null) {
      this.financialOutRecordService.GetFinancialOutcomeRecord(record.id).subscribe(r => {
        this.router.navigate(['/accountingBooks', r.book.bookId, r.book.bookOrderNumberId])
      })
    }
  }
}
