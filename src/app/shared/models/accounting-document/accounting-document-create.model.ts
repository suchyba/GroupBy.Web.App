export interface ICreateAccountingDocument {
    name: string,
    filePath: string,
    groupsId: string[],
    relatedProjectId: string | undefined
}