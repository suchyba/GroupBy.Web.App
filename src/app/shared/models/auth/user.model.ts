import { IVolunteer } from "../volunteer/volunteer.model";

export interface IUser {
    relatedVolunteer: IVolunteer
    email: string,
    emailConfirmed: boolean
}