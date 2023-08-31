import { ISimpleAccountingDocument } from "../accounting-document/accounting-document-simple.model";
import { ISimpleDocument } from "../document/document-simple.model";
import { ISimpleInventoryBook } from "../inventory-book/inventory-book-simple.model";
import { ISimpleInventoryItemSource } from "../inventory-item-source/inventory-item-source-simple.model";
import { ISimpleInventoryItem } from "../inventory-item/inventory-item-simple.model";

export interface IListInventoryBookRecord {
    id: string,
    orderId: number,
    date: Date,
    document: ISimpleDocument | ISimpleAccountingDocument,
    income: boolean,
    item: ISimpleInventoryItem,
    source: ISimpleInventoryItemSource,
    book: ISimpleInventoryBook
}