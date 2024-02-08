import { useState } from "react";
import { Account, UseGetCurrentAccount } from "@/types/account";
import { api } from "@/utils/fetch";

const useGetCurrentAccount = () : UseGetCurrentAccount => {
    const [account, setAccount] = useState<Account | null>(null);
    const [error, setError] = useState<any>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const get = async (): Promise<void> => {
        setIsLoading(true);
        try {
            const response = await api<any>(`/api/v1/account`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            });

            console.log(response);
            const account: Account = {
                email: "",
                first_name: "",
                last_name: "",
                id: ""
            };
            setAccount(account);
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
