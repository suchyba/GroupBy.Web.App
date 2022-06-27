export interface ICreateInventoryBookRecord {
    inventoryBookId: number,
    itemId: number | undefined,
    date: Date | undefined,
    documentId: number | undefined,
    income: boolean,
    sourceId: number | undefined
}