import { Photo } from "./photo";
import { Service } from "./service";

export interface Member {
    id:         number;
    userName:   string;
    photoUrl:   string;
    created:    Date;
    lastActive: Date;
    services:   Service[];
    photos:     Photo[];
}


