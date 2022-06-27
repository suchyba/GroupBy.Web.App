import { ISimpleGroup } from "../group/group-simple.model";

export interface IInventoryBook {
    id: number,
    name: string,
    relatedGroup: ISimpleGroup
}