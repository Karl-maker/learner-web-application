import { useState } from "react";
import { Account, GetCurrentAccountResponse, UseGetCurrentAccount } from "@/types/account";
import { api } from "@/utils/fetch";
import { ApplicationError, determineErrorType } from "@/utils/error";
import { checkErrorInstance } from "@/utils/instance/error";

/**
 * @param isLoading value true if request is still loading
 * @param error a ApplicationError or null
 * @param get method to activate getting the current account details
 * @param account The current account details 
 */

const useGetCurrentAccount = () : UseGetCurrentAccount => {
    const [account, setAccount] = useState<Account | null>(null);
    const [error, setError] = useState<ApplicationError | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const get = async (): Promise<void> => {
        setIsLoading(true);
        try {
            const response = await api<GetCurrentAccountResponse>(`/api/v1/account`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            }, true);

            console.debug(`useGetCurrentAccount():`, response);

            const account: Account = {
                email: response.data?.data.email || "",
                first_name: response.data?.data.first_name || "",
                last_name: response.data?.data.last_name || "",
                id: response.data?.data.id || "",
                type: response.data?.data.type || null
            };
            
            setAccount(account);
            setError(null);
        } catch (error: any) {
            setError(checkErrorInstance(error));
            setAccount(null);
        } finally {
            setIsLoading(false);
        }
    };

    return { account, error, isLoading, get };
};

export default useGetCurrentAccount;
