export interface ICreateDocument {
    name: string,
    filePath: string,
    groupsId: number[],
    relatedProjectId: number | undefined
}