import { useState } from "react";
import config from "@/config";
import { Account, UseGetCurrentAccount } from "@/types/account";
import { getAccessToken } from "@/utils/access-token";

const API_URL = config.api.BASE_URL; // Replace with your API endpoint

const useGetCurrentAccount = () : UseGetCurrentAccount => {
    const [account, setAccount] = useState<Account | null>(null);
    const [error, setError] = useState<any>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const get = async (): Promise<void> => {
        setIsLoading(true);
        try {
            const access_token = getAccessToken();
            const response = await fetch(`${API_URL}/api/v2/account`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            });

            if (!response.ok) {
                throw new Error("Login failed");
            }

            const data = await response.json();
            setAccount(data);
            setError(null);
        } catch (error) {
            setError(error);
            setAccount(null);
        } finally {
            setIsLoading(false);
        }
    };

    return { account, error, isLoading, get };
};

export default useGetCurrentAccount;
