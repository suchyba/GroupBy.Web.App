export interface ITransferInventoryBookRecord {
    inventoryBookFromId: string,
    inventoryBookToId: string | undefined,
    itemId: string | undefined,
    date: Date | undefined,
    documentName: string | undefined
    sourceFromId: string | undefined
    sourceToId: string | undefined
}