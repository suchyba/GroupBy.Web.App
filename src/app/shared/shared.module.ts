import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";

import { AccountingBookAddModalComponent } from "./components/modals/accounting-book-add-modal/accounting-book-add-modal.component";
import { AccountingDocumentAddModalComponent } from "./components/modals/accounting-document-add-modal/accounting-document-add-modal.component";
import { ConfirmationYesNoModalComponent } from "./components/modals/confirmation-yes-no-modal/confirmation-yes-no-modal.component";
import { FinancialIncomeRecordAddModalComponent } from "./components/modals/financial-income-record-add-modal/financial-income-record-add-modal.component";
import { FinancialOutcomeRecordAddModalComponent } from "./components/modals/financial-outcome-record-add-modal/financial-outcome-record-add-modal.component";
import { GroupAddModalComponent } from "./components/modals/group-add-modal/group-add-modal.component";
import { ProjectAddModalComponent } from "./components/modals/project-add-modal/project-add-modal.component";
import { AccountingBookService } from "./services/accounting-book.service";
import { AccountingDocumentService } from "./services/accounting-document.service";
import { FinancialIncomeRecordService } from "./services/financial-income-record.service";
import { FinancialOutcomeRecordService } from "./services/financial-outcome-record.service";
import { GroupService } from "./services/group.service";
import { ProjectService } from "./services/project.service";
import { VolunteerService } from "./services/volunteer.service";

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule],
    declarations: [
        // modals
        GroupAddModalComponent,
        FinancialIncomeRecordAddModalComponent,
        AccountingDocumentAddModalComponent,
        FinancialOutcomeRecordAddModalComponent,
        AccountingBookAddModalComponent,
        ProjectAddModalComponent,
        ConfirmationYesNoModalComponent],
    exports: [
        CommonModule,
        // modals
        GroupAddModalComponent,
        FinancialIncomeRecordAddModalComponent,
        AccountingDocumentAddModalComponent,
        FinancialOutcomeRecordAddModalComponent,
        AccountingBookAddModalComponent,
        ProjectAddModalComponent,
        ConfirmationYesNoModalComponent],
    providers: [
        AccountingBookService,
        AccountingDocumentService,
        FinancialIncomeRecordService,
        FinancialOutcomeRecordService,
        GroupService,
        ProjectService,
        VolunteerService
    ]
})
export class SharedModule { };