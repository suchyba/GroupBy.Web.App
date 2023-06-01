export interface ICreateDocument {
    name: string,
    filePath: string,
    groupsId: string[],
    relatedProjectId: string | undefined
}