import { useState } from "react";
import { SignUpResponse, UseSignUp } from "@/types/authentication";
import { api } from "@/utils/fetch";
import { checkErrorInstance } from "@/utils/instance/error";

const useSignUp = () : UseSignUp => {
    const [error, setError] = useState<Error | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [result, setResult] = useState<string | null>(null);

    const signup = async (
        first_name: string, 
        last_name: string, 
        email: string,
        password: string
    ): Promise<void> => {
        setIsLoading(true);
        try {
            const response = await api<SignUpResponse>(`/api/v1/account/signup`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ 
                    first_name,
                    last_name,
                    email, 
                    password,
                    type: 'student'
                })
            });

            console.debug(`useSignUp():`, response);

            setResult(response.data?.message || null);
            setError(null);
        } catch (error: any) {
            setError(checkErrorInstance(error));
        } finally {
            setIsLoading(false);
        }
    };

    return { result, error, isLoading, signup };
};

export default useSignUp;
