export type Severity = 'warn' | 'error' | 'fatal';

export class ApplicationError extends Error {
    code: number;
    severity: Severity;

    constructor(message: string, severity: Severity, code: number = 500) {
        super(message);
        this.code = code;
        this.severity = severity;
    }; 
}

export class UnexpectedError extends ApplicationError {

    constructor(message: string, severity: Severity) {
        super(message, severity, 500);
    }
    
}

export class UnAuthorizedError extends ApplicationError {
    
    constructor(message: string, severity: Severity) {
        super(message, severity, 401);
    }
    
}

export class ForbiddenError extends ApplicationError {

    constructor(message: string, severity: Severity) {
        super(message, severity, 403);
    }
    
}

export function determineErrorType(error: any): ApplicationError {



    return new UnexpectedError("", 'error');
}