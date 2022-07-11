export interface ICreateAccountingDocument {
    name: string,
    filePath: string,
    groupsId: number[],
    projectId: number | undefined
}