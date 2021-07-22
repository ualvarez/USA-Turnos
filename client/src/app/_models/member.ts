import { Photo } from "./photo";
import { Service } from "./service";

export interface Member {
    id:         number;
    userName:   string;
    age: number;
    name: string;
    surname: string;
    interests: string;
    country: string;
    city: string;
    phoneNumber: string;
    email: string;
    photoUrl:   string;
    created:    Date;
    lastActive: Date;
    services:   Service[];
    photos:     Photo[];
}


