import { Authentication } from "@/types/authentication";

export const defaultAuthentication: Authentication = {
    isLoggedIn: false,
    token: {
        access: ""
    }
}

export const defaultAuthenticationContext = {
    authentication: defaultAuthentication,
    setAuthentication: (authentication: Authentication) => {}
}