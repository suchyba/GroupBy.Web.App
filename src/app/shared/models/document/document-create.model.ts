export interface ICreateDocument {
    name: string,
    filePath: string,
    groupsId: number[],
    projectId: number | undefined
}