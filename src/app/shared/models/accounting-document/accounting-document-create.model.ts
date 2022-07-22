export interface ICreateAccountingDocument {
    name: string,
    filePath: string,
    groupsId: number[],
    relatedProjectId: number | undefined
}