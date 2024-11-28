import { IContact } from "./contact.model";


export interface IContactActionGraphData {
    _id: string;
    cantidad: number;
}


export interface IContactActionData {
    userEmail: string;
    slug: string;
    date: string;
    timesPerformed: string;
    action: string;
    user: IContact;
}
