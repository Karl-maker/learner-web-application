import { AccountTypes } from "../account"

export type User = {
    type?: AccountTypes;
    authenticated: boolean;
    details?: {
        account_id: string;
        student_id?: string;
        first_name?: string;
        last_name?: string;
        profile?: {
            picture?: {
                url: string;
            };
        };
    };
}

export type UserContext = {
    user: User;
    setUser: (user: User) => void;
    isLoading: boolean;
};