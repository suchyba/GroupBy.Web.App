export interface IUpdateAccountingBook {
    id: string,
    bookIdentificator: number | undefined,
    bookOrderNumberId: number | undefined,
    name: string | undefined,
    locked: boolean | undefined
}