import { Photo } from "./photo";


export interface Service {
    id: number;
    name: string;
    description: string;
    photoUrl: string
    photos: Photo[];
}
