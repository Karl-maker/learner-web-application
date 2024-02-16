import { ApplicationError } from "@/utils/error";

export type UseBase = {
    error: ApplicationError | null; 
    isLoading: boolean;
}

export type GetManyQueryParams<T> = {
    sort: 'asc' | 'desc';
    field: keyof T;
    page_size: number;
    page: number;
}