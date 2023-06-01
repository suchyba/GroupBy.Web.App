import { ISimpleGroup } from "../group/group-simple.model";

export interface IAccountingBook {
    id: string
    bookIdentificator: number,
    bookOrderNumberId: number,
    name: string,
    locked: boolean,
    relatedGroup: ISimpleGroup,
    balance: number
}