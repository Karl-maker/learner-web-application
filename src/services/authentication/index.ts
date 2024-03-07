import { removeAccessTokenFromLocalStorage } from "@/utils/access-token"

export const logout = () => {
    removeAccessTokenFromLocalStorage();
}