import { ApplicationError, UnexpectedError } from "@/utils/error";

export function checkErrorInstance(error: any): ApplicationError {
    return error instanceof ApplicationError ? error : new UnexpectedError('Unexpected Issue', 'error');
}