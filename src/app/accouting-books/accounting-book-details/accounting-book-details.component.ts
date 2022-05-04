import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BsModalService } from 'ngx-bootstrap/modal';
import { FinancialIncomeRecordAddModalComponent } from 'src/app/shared/components/modals/financial-income-record-add-modal/financial-income-record-add-modal.component';
import { FinancialOutcomeRecordAddModalComponent } from 'src/app/shared/components/modals/financial-outcome-record-add-modal/financial-outcome-record-add-modal.component';
import { IAccountingBook } from 'src/app/shared/models/accounting-book/accounting-book.model';
import { ISimpleFinancialRecord } from 'src/app/shared/models/financial-record/financial-record-simple.model';
import { AccountingBookService } from 'src/app/shared/services/accounting-book.service';

@Component({
  selector: 'app-accounting-book-details',
  templateUrl: './accounting-book-details.component.html',
  styleUrls: ['./accounting-book-details.component.css']
})
export class AccountingBookDetailsComponent implements OnInit {
  accountingBook: IAccountingBook | undefined

  membershipFeeTotal: number | undefined
  programFeeTotal: number | undefined
  dotationTotal: number | undefined
  earningActionTotal: number | undefined
  onePercentTotal: number | undefined
  otherIncomeTotal: number | undefined

  incomeTotal: number | undefined
  outcomeTotal: number | undefined

  inventoryTotal: number | undefined
  materialTotal: number | undefined
  serviceTotal: number | undefined
  transportTotal: number | undefined
  insuranceTotal: number | undefined
  accommodationTotal: number | undefined
  salaryTotal: number | undefined
  foodTotal: number | undefined
  otherOutcomeTotal: number | undefined

  records: ISimpleFinancialRecord[] | undefined | null = null
  constructor(
    private route: ActivatedRoute,
    private accountingBookService: AccountingBookService,
    private modalService: BsModalService) { }

  ngOnInit(): void {
    this.accountingBook = this.route.snapshot.data['accountingBook']
    this.refreshFinancialRecords()
  }

  refreshFinancialRecords(): void {
    if (this.accountingBook)
      this.accountingBookService.GetFinancialRecords(this.accountingBook?.bookId, this.accountingBook?.bookOrderNumberId).subscribe(r => {
        this.records = r.sort((r1, r2) => new Date(r1.date).getTime() - new Date(r2.date).getTime()).map(r => {
          r.date = new Date(r.date)
          return r
        })

        this.membershipFeeTotal = undefined
        this.programFeeTotal = undefined
        this.programFeeTotal = undefined
        this.dotationTotal = undefined
        this.earningActionTotal = undefined
        this.onePercentTotal = undefined
        this.otherIncomeTotal = undefined
        this.incomeTotal = 0

        this.inventoryTotal = undefined
        this.materialTotal = undefined
        this.serviceTotal = undefined
        this.transportTotal = undefined
        this.insuranceTotal = undefined
        this.accommodationTotal = undefined
        this.salaryTotal = undefined
        this.foodTotal = undefined
        this.otherOutcomeTotal = undefined
        this.outcomeTotal = 0

        // loading total values
        this.records.forEach(rec => {
          if (rec.membershipFee) {
            if (this.membershipFeeTotal)
              this.membershipFeeTotal += rec.membershipFee
            else
              this.membershipFeeTotal = rec.membershipFee
          }
          if (rec.programFee) {
            if (this.programFeeTotal)
              this.programFeeTotal += rec.programFee
            else
              this.programFeeTotal = rec.programFee
          }
          if (rec.dotation) {
            if (this.dotationTotal)
              this.dotationTotal += rec.dotation
            else
              this.dotationTotal = rec.dotation
          }
          if (rec.earningAction) {
            if (this.earningActionTotal)
              this.earningActionTotal += rec.earningAction
            else
              this.earningActionTotal = rec.earningAction
          }
          if (rec.onePercent) {
            if (this.onePercentTotal)
              this.onePercentTotal += rec.onePercent
            else
              this.onePercentTotal = rec.onePercent
          }
          if (rec.otherIncome) {
            if (this.otherIncomeTotal)
              this.otherIncomeTotal += rec.otherIncome
            else
              this.otherIncomeTotal = rec.otherIncome
          }

          if (rec.otherIncome !== null) {
            if (this.incomeTotal)
              this.incomeTotal += rec.total
            else
              this.incomeTotal = rec.total
          }

          if (rec.otherOutcome !== null) {
            if (this.outcomeTotal)
              this.outcomeTotal += rec.total
            else
              this.outcomeTotal = rec.total
          }

          if (rec.inventory) {
            if (this.inventoryTotal)
              this.inventoryTotal += rec.inventory
            else
              this.inventoryTotal = rec.inventory
          }
          if (rec.material) {
            if (this.materialTotal)
              this.materialTotal += rec.material
            else
              this.materialTotal = rec.material
          }
          if (rec.service) {
            if (this.serviceTotal)
              this.serviceTotal += rec.service
            else
              this.serviceTotal = rec.service
          }
          if (rec.transport) {
            if (this.transportTotal)
              this.transportTotal += rec.transport
            else
              this.transportTotal = rec.transport
          }
          if (rec.insurance) {
            if (this.insuranceTotal)
              this.insuranceTotal += rec.insurance
            else
              this.insuranceTotal = rec.insurance
          }
          if (rec.accommodation) {
            if (this.accommodationTotal)
              this.accommodationTotal += rec.accommodation
            else
              this.accommodationTotal = rec.accommodation
          }
          if (rec.salary) {
            if (this.salaryTotal)
              this.salaryTotal += rec.salary
            else
              this.salaryTotal = rec.salary
          }
          if (rec.food) {
            if (this.foodTotal)
              this.foodTotal += rec.food
            else
              this.foodTotal = rec.food
          }
          if (rec.otherOutcome) {
            if (this.otherOutcomeTotal)
              this.otherOutcomeTotal += rec.otherOutcome
            else
              this.otherOutcomeTotal = rec.otherOutcome
          }
        })
        if (this.incomeTotal && this.outcomeTotal && this.accountingBook)
          this.accountingBook.balance = this.incomeTotal - this.outcomeTotal
      })
  }

  openFinancialIncomeRecordAddModal(): void {
    if (this.accountingBook) {
      let modal = this.modalService.show(FinancialIncomeRecordAddModalComponent, {
        initialState: {
          group: this.accountingBook?.relatedGroup,
          recordToCreate: {
            bookId: this.accountingBook?.bookId,
            bookOrderNumberId: this.accountingBook?.bookOrderNumberId,
            date: new Date(),
            description: "",
            dotation: 0,
            earningAction: 0,
            membershipFee: 0,
            onePercent: 0,
            other: 0,
            programFee: 0,
            relatedDocumentId: undefined,
            relatedProjectId: undefined
          }
        }
      })
      if (modal.onHidden) {
        modal.onHidden.subscribe(() => {
          this.records = undefined
          this.refreshFinancialRecords()
        })
      }
    }
  }
  openFinancialOutcomeRecordAddModal(): void {
    if (this.accountingBook) {
      let modal = this.modalService.show(FinancialOutcomeRecordAddModalComponent, {
        initialState: {
          group: this.accountingBook?.relatedGroup,
          recordToCreate: {
            bookId: this.accountingBook?.bookId,
            bookOrderNumberId: this.accountingBook?.bookOrderNumberId,
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
            relatedProjectId: undefined
          }
        }
      })
      if (modal.onHidden) {
        modal.onHidden.subscribe(() => {
          this.records = undefined
          this.refreshFinancialRecords()
        })
      }
    }
  }

}
