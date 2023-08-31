import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";

import { AccountingBookAddModalComponent } from "./components/modals/accounting-book-add-modal/accounting-book-add-modal.component";
import { DocumentAddModalComponent } from "./components/modals/document-add-modal/document-add-modal.component";
import { ConfirmationYesNoModalComponent } from "./components/modals/confirmation-yes-no-modal/confirmation-yes-no-modal.component";
import { FinancialIncomeRecordAddModalComponent } from "./components/modals/financial-income-record-add-modal/financial-income-record-add-modal.component";
import { FinancialOutcomeRecordAddModalComponent } from "./components/modals/financial-outcome-record-add-modal/financial-outcome-record-add-modal.component";
import { GroupAddModalComponent } from "./components/modals/group-add-modal/group-add-modal.component";
import { ProjectAddModalComponent } from "./components/modals/project-add-modal/project-add-modal.component";
import { GroupThumbnailComponent } from "./components/thumbnails/group-thumbnail/group-thumbnail.component";
import { InventoryBookThumbnailComponent } from "./components/thumbnails/inventory-book-thumbnail/inventory-book-thumbnail.component";
import { ProjectThumbnailComponent } from "./components/thumbnails/project-thumbnail/project-thumbnail.component";
import { VolunteerThumbnailComponent } from "./components/thumbnails/volunteer-thumbnail/volunteer-thumbnail.component";
import { AccountingBookService } from "./services/accounting-book.service";
import { AccountingDocumentService } from "./services/accounting-document.service";
import { FinancialIncomeRecordService } from "./services/financial-income-record.service";
import { FinancialOutcomeRecordService } from "./services/financial-outcome-record.service";
import { GroupService } from "./services/group.service";
import { ProjectService } from "./services/project.service";
import { VolunteerService } from "./services/volunteer.service";
import { InventoryBookAddModalComponent } from './components/modals/inventory-book-add-modal/inventory-book-add-modal.component';
import { InventoryBookRecordAddModalComponent } from './components/modals/inventory-book-record-add-modal/inventory-book-record-add-modal.component';
import { TypeaheadModule } from "ngx-bootstrap/typeahead";
import { AccordionModule } from 'ngx-bootstrap/accordion';
import { InventoryItemLiquidateComponent } from './components/modals/inventory-item-liquidate/inventory-item-liquidate.component';
import { InventoryItemAddModalComponent } from './components/modals/inventory-item-add-modal/inventory-item-add-modal.component';
import { InventoryBookRecordTransferModalComponent } from './components/modals/inventory-book-record-transfer-modal/inventory-book-record-transfer-modal.component';
import { RegistrationCodeAddModalComponent } from './components/modals/registration-code-add-modal/registration-code-add-modal.component';
import { InventoryItemHistoryModalComponent } from './components/modals/inventory-item-history-modal/inventory-item-history-modal.component';

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        RouterModule,
        TypeaheadModule,
        FormsModule,
        AccordionModule],
    declarations: [
        // modals
        GroupAddModalComponent,
        FinancialIncomeRecordAddModalComponent,
        DocumentAddModalComponent,
        FinancialOutcomeRecordAddModalComponent,
        AccountingBookAddModalComponent,
        ProjectAddModalComponent,
        ConfirmationYesNoModalComponent,
        InventoryBookAddModalComponent,
        InventoryBookRecordAddModalComponent,
        InventoryItemLiquidateComponent,
        InventoryItemAddModalComponent,
        InventoryBookRecordTransferModalComponent,
        RegistrationCodeAddModalComponent,
        InventoryItemHistoryModalComponent,
        // thumbnails
        ProjectThumbnailComponent,
        GroupThumbnailComponent,
        InventoryBookThumbnailComponent,
        VolunteerThumbnailComponent,
    ],
    exports: [
        CommonModule,
        ReactiveFormsModule,
        // modals
        GroupAddModalComponent,
        FinancialIncomeRecordAddModalComponent,
        DocumentAddModalComponent,
        FinancialOutcomeRecordAddModalComponent,
        AccountingBookAddModalComponent,
        ProjectAddModalComponent,
        ConfirmationYesNoModalComponent,
        // thumbnails
        ProjectThumbnailComponent,
        GroupThumbnailComponent,
        InventoryBookThumbnailComponent,
        VolunteerThumbnailComponent],
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