export interface ICreateAccountingBook {
    bookId: number | undefined,
    bookOrderNumberId: number | undefined,
    name: string | undefined,
    locked: boolean | undefined,
    relatedGroupId: number | undefined
}