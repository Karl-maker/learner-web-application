import { User, UserContext } from "@/types/user"

export const defaultUser: User = {
    authenticated: false
}

export const defaultUserContext: UserContext = {
    user: defaultUser,
    setUser: (user: User) => {}
}