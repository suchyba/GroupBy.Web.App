export interface IUpdateVolunteer {
    id: number,
    firstNames: string,
    lastName: string,
    birthDate: Date,
    phoneNumber: string,
    address: string,
    confirmed: boolean,
    rankId?: number
}