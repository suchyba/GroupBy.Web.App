import { ISimpleAccountingDocument } from "src/app/shared/models/accounting-document/accounting-document-simple.model";
import { ISimpleDocument } from "src/app/shared/models/document/document-simple.model";
import { ISimpleInventoryBook } from "src/app/shared/models/inventory-book/inventory-book-simple.model";
import { ISimpleInventoryItemSource } from "src/app/shared/models/inventory-item-source/inventory-item-source-simple.model";

export interface IInventoryTransferModel {
    orderId: number,
    date: Date,
    sourceBook: ISimpleInventoryBook,
    destinationBook: ISimpleInventoryBook | undefined,
    sourceFrom: ISimpleInventoryItemSource,
    sourceTo: ISimpleInventoryItemSource | undefined,
    document: ISimpleDocument | ISimpleAccountingDocument
}