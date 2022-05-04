import { ISimpleAccountingBook } from "../accounting-book/accounting-book-simple.model"
import { ISimpleAccountingDocument } from "../accounting-document/accounting-document-simple.model"
import { ISimpleProject } from "../project/project-simple.model"

export interface IFinancialOutcomeRecord {
    id: number,
    inventory: number,
    material: number,
    service: number,
    transport: number,
    insurance: number,
    accommodation: number,
    salary: number,
    food: number,
    other: number,
    date: Date,
    description: string,
    book: ISimpleAccountingBook,
    relatedProject: ISimpleProject | undefined,
    relatedDocument: ISimpleAccountingDocument
}