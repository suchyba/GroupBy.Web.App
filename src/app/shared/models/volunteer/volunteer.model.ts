import { IRankSimple } from "../rank/rank-simple.model";
import { ISimpleVolunteer as IVolunteerSimple } from "./volunteer-simple.model";

export interface IVolunteer extends IVolunteerSimple {
    birthDate: Date,
    phoneNumber: string,
    address: string,
    confirmed: boolean,
    rank: IRankSimple
}