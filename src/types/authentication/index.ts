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
    status: 'pending' | 'logged_in' | 'logged_out'; 
    login: (email: string, password: string) => Promise<void>;
}
