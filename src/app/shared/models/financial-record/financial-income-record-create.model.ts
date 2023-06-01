export interface ICreateFinancialIncomeRecord {
    membershipFee: number,
    programFee: number,
    dotation: number,
    earningAction: number,
    onePercent: number,
    other: number,
    date: Date,
    description: string,
    bookId: string | undefined,
    relatedProjectId: string | undefined,
    relatedDocumentId: string | undefined
}