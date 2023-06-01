import { ISimpleGroup } from "../group/group-simple.model";

export interface IInventoryBook {
    id: string,
    name: string,
    relatedGroup: ISimpleGroup
}