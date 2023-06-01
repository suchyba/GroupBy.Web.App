export interface ICreateFinancialOutcomeRecord {
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
    bookId: string | undefined,
    relatedProjectId: string | undefined,
    relatedDocumentId: string | undefined
}