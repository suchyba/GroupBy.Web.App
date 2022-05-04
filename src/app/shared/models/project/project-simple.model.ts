export interface ISimpleProject {
    id: number
    name: string
    description: string
    beginDate: Date | undefined
    endDate: Date | undefined
    active: boolean
    independent: boolean
}