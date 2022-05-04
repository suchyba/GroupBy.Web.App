export interface ICreateGroup {
    name: string | undefined
    description: string | undefined,
    parentGroupId: number | undefined,
    ownerId: number
}