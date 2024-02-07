import { UseBase } from "../base";

export type Account = {
    email: string;
    first_name: string;
    last_name: string;
    id: string;
}

export type UseGetCurrentAccount = UseBase & {
    account: Account | null; 
    get: () => Promise<void>;
}