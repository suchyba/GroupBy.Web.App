export interface IUpdateVolunteer {
    id: string,
    firstNames: string,
    lastName: string,
    birthDate: Date,
    phoneNumber: string,
    address: string,
    confirmed: boolean,
    rankId?: string
}