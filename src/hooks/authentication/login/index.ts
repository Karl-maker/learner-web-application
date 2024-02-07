import { useState } from "react";
import config from "@/config";
import { UseLogin } from "@/types/authentication";
import { setAccessTokenInLocalStorage } from "@/utils/access-token";

const API_URL = config.api.BASE_URL; // Replace with your API endpoint

const useLogin = () : UseLogin => {
    const [error, setError] = useState<any>(null);
    const [status, setStatus] = useState<'pending' | 'logged_in' | 'logged_out'>('pending');
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const login = async (email: string, password: string): Promise<void> => {
        setIsLoading(true);
        try {
            const response = await fetch(`${API_URL}/api/v2/student/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ email, password })
            });

            if (!response.ok) {
                throw new Error("Login failed");
            }

            const data = await response.json();
            setAccessTokenInLocalStorage(data.access_token);
            setStatus('logged_in');
            setError(null);
        } catch (error) {
            setStatus('logged_out');
            setError(error);
        } finally {
            setIsLoading(false);
        }
    };

    return { status, error, isLoading, login };
};

export default useLogin;
