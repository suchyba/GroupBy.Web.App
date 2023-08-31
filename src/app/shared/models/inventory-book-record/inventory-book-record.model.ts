import { ISimpleAccountingDocument } from "../accounting-document/accounting-document-simple.model";
import { ISimpleDocument } from "../document/document-simple.model";
import { ISimpleInventoryBook } from "../inventory-book/inventory-book-simple.model";
import { ISimpleInventoryItem } from "../inventory-item/inventory-item-simple.model";

export interface IInventoryBookRecord {
    id: string,
    orderId: number,
    date: Date,
    document: ISimpleDocument | ISimpleAccountingDocument,
    income: boolean,
    item: ISimpleInventoryItem,
    source: ISimpleInventoryItem,
    inventoryBook: ISimpleInventoryBook
}