export interface ICreateInventoryBookRecord {
    inventoryBookId: string,
    itemId: string | undefined,
    date: Date | undefined,
    documentId: string | undefined,
    income: boolean,
    sourceId: string | undefined
}