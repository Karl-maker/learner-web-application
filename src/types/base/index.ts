import { ApplicationError } from "@/utils/error";

export type UseBase = {
    error: ApplicationError | null; 
    isLoading: boolean;
}