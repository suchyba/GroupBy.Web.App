import { ISimpleGroup } from "../group/group-simple.model"
import { ISimpleVolunteer } from "../volunteer/volunteer-simple.model"

export interface IProject {
    id: number
    name: string
    description: string
    beginDate: Date | undefined
    endDate: Date | undefined
    active: boolean
    independent: boolean
    parentGroup: ISimpleGroup
    projectGroup: ISimpleGroup | undefined
    owner: ISimpleVolunteer
}