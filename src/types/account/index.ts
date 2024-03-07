import { UseBase } from "../base";

export type Account = {
    email: string;
    first_name: string;
    last_name: string;
    id: string;
    type: AccountTypes;
}

export type UseGetCurrentAccount = UseBase & {
    account: Account | null; 
    get: () => Promise<void>;
}

export type GetCurrentAccountResponse = {
    data: Account;
}

export type GetAccountByIdResponse = {
    data: Account;
}

export type AccountTypes = 'student' | 'administrator' | null;