import { User } from './user'

export interface SuccessfulUserResponse {
    user: User;
    token: string;
}