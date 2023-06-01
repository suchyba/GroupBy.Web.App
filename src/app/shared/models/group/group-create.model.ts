export interface ICreateGroup {
    name: string | undefined
    description: string | undefined,
    parentGroupId: string | undefined,
    ownerId: string
}