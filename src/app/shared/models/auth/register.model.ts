export interface IRegister {
    Email: string,
    Password: string,
    RelatedVolunteerFirstNames: string,
    RelatedVolunteerLastName: string,
    RelatedVolunteerBirthDate: Date,
    RelatedVolunteerPhoneNumber: string,
    RelatedVolunteerAddress: string | undefined
    RegistrationCode: string
}
