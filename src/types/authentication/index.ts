import { AccountTypes } from "../account";
import { UseBase } from "../base";

export type Authentication = {
    isLoggedIn: boolean;
    token: {
        access: string;
    };
}

export type AuthenticationContext = {
    authentication: Authentication;
    setAuthentication: (authentication: Authentication) => {};
}

export type UseLogin = UseBase & {
    isLoggedIn: boolean; 
    login: (email: string, password: string) => Promise<void>;
}

export type UseSignUp = UseBase & {
    result: string | null; 
    signup: (first_name: string, last_name: string, email: string, password: string, type: AccountTypes) => Promise<void>;
}

export type LoginResponse = {
    tokens: {
        access_token: string;
        refresh_token?: string;
    };
}

export type SignUpResponse = {
    message: string;
}
