import { Account, GetAccountByIdResponse } from "@/types/account";
import { service } from "@/utils/fetch";
import { checkErrorInstance } from "@/utils/instance/error";

export const getAccountById = async (id: string): Promise<Account | null> => {
    try{
        const response = await service<GetAccountByIdResponse>(`/api/v1/account/${id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });

        console.log(`getAccountById():`, response);
        const account: Account | null = response.data?.data || null;
        return account;
    } catch(err) {
        throw checkErrorInstance(err);
    }
}