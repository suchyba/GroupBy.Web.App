export interface ISimpleProject {
    id: string
    name: string
    description: string
    beginDate: Date | undefined
    endDate: Date | undefined
    active: boolean
    independent: boolean
}