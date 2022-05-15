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
    bookId: number | undefined,
    bookOrderNumberId: number | undefined,
    relatedProjectId: number | undefined,
    relatedDocumentId: number | undefined
}