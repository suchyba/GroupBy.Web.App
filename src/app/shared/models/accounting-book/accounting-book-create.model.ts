export interface ICreateAccountingBook {
    bookIdentificator: number | undefined,
    bookOrderNumberId: number | undefined,
    name: string | undefined,
    locked: boolean | undefined,
    relatedGroupId: string | undefined
}