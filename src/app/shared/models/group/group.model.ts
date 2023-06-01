import { ISimpleInventoryBook } from "../inventory-book/inventory-book-simple.model"
import { ISimpleProject } from "../project/project-simple.model"
import { ISimpleVolunteer } from "../volunteer/volunteer-simple.model"
import { ISimpleGroup as IGroupSimple } from "./group-simple.model"

export interface IGroup {
    id: string
    name: string
    description: string
    owner: ISimpleVolunteer
    parentGroup: IGroupSimple
    relatedProject: ISimpleProject
    inventoryBook: ISimpleInventoryBook | undefined
}