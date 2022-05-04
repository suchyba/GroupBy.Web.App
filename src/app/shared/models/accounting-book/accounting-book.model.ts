import { ISimpleGroup } from "../group/group-simple.model";

export interface IAccountingBook {
    bookId: number,
    bookOrderNumberId: number,
    name: string,
    locked: boolean,
    relatedGroup: ISimpleGroup,
    balance: number
}