export interface ISimpleFinancialRecord {
    id: string,
    date: Date,
    description: string,
    relatedDocumentName: string,
    relatedProjectName: string,

    // INCOME
    membershipFee: number | undefined,
    programFee: number | undefined,
    dotation: number | undefined,
    earningAction: number | undefined,
    onePercent: number | undefined,
    otherIncome: number | undefined,

    // OUTCOME
    inventory: number | undefined,
    material: number | undefined,
    service: number | undefined,
    transport: number | undefined,
    insurance: number | undefined,
    accommodation: number | undefined,
    salary: number | undefined,
    food: number | undefined,
    otherOutcome: number | undefined,

    total: number
}