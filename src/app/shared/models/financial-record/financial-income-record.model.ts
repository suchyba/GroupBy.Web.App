import { ISimpleAccountingBook } from "../accounting-book/accounting-book-simple.model"
import { ISimpleAccountingDocument } from "../accounting-document/accounting-document-simple.model"
import { ISimpleProject } from "../project/project-simple.model"

export interface IFinancialIncomeRecord {
    id: string
    membershipFee: number,
    programFee: number,
    dotation: number,
    earningAction: number,
    onePercent: number,
    other: number,
    date: Date,
    description: string,
    book: ISimpleAccountingBook,
    relatedProject: ISimpleProject | undefined,
    relatedDocument: ISimpleAccountingDocument
}