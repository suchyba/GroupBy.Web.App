export interface ICreateFinancialIncomeRecord {
    membershipFee: number,
    programFee: number,
    dotation: number,
    earningAction: number,
    onePercent: number,
    other: number,
    date: Date,
    description: string,
    bookId: number | undefined,
    bookOrderNumberId: number | undefined,
    relatedProjectId: number | undefined,
    relatedDocumentId: number | undefined
}