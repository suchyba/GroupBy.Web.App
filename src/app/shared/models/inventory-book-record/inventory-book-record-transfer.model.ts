export interface ITransferInventoryBookRecord {
    inventoryBookFromId: number,
    inventoryBookToId: number | undefined,
    itemId: number | undefined,
    date: Date | undefined,
    documentName: string | undefined
    sourceFromId: number | undefined
    sourceToId: number | undefined
}