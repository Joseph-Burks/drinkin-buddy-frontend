import { Review } from "./review";
import { Beer } from "./beer";

export interface User {
    id: number;
    username: string;
    reviews: Review[];
    interests: Beer[]
}