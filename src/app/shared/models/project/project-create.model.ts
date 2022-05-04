export interface ICreateProject {
    name: string | undefined
    description: string | undefined
    beginDate: Date | undefined
    endDate: Date | undefined
    active: boolean
    independent: boolean
    parentGroupId: number | undefined
    ownerId: number
}