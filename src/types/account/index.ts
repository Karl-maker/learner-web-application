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
    data: {
        email: string;
        first_name?: string;
        last_name?: string;
        type: AccountTypes;
        id: string;
        created_at: Date;
        updated_at: Date;
        v: number;
    };
}

export type AccountTypes = 'student' | 'administrator' | null;