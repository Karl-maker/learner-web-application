import { useState } from "react";
import config from "@/config";
import { LoginResponse, UseLogin } from "@/types/authentication";
import { setAccessTokenInLocalStorage } from "@/utils/access-token";
import { api } from "@/utils/fetch";
import { ApplicationError, determineErrorType } from "@/utils/error";
import { checkErrorInstance } from "@/utils/instance/error";

/**
 * @param isLoading value true if request is still loading
 * @param error a ApplicationError or null
 * @param login method to activate login
 * @param isLoggedIn if login was successful
 * 
 * @note after successful login the application can use tokens
 */

const useLogin = () : UseLogin => {
    const [error, setError] = useState<ApplicationError | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

    const login = async (email: string, password: string): Promise<void> => {
        setIsLoading(true);
        try {
            const response = await api<LoginResponse>(`/api/v1/account/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ email, password })
            });

            console.debug(`useLogin():`, response);

            const access_token = response.data?.tokens.access_token || "";
            setAccessTokenInLocalStorage(access_token);
            setIsLoggedIn(true);
            setError(null);
        } catch (error: any) {
            setError(checkErrorInstance(error));
        } finally {
            setIsLoading(false);
        }
    };

    return { isLoggedIn, error, isLoading, login };
};

export default useLogin;
