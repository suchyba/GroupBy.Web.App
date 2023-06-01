import { ISimpleGroup } from "../group/group-simple.model";
import { ISimpleProject } from "../project/project-simple.model";

export interface IAccountingDocument {
    id: string,
    name: string,
    filePath: string,
    relatedProject: ISimpleProject | undefined,
    group: ISimpleGroup
}