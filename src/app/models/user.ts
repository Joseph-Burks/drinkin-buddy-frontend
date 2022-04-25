import { UserReview } from "./review";
import { InterestedBeer } from "./interest";

export interface User {
    id: number;
    username: string;
    reviews: UserReview[];
    interests: InterestedBeer[]
}