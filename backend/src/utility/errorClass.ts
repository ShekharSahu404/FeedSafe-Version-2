export interface ErrorMessage {
    field: string;
    message: string;
}

export class AppError extends Error {
    statusCode: number;
    isOperational: boolean;
    errors?: ErrorMessage[];

    constructor(
        message: string,
        statusCode: number,
        errors?: ErrorMessage[]
    ) {
        super(message); // ✅ must be string
        this.statusCode = statusCode;
        this.isOperational = true;
        this.errors = errors;

        // Error.captureStackTrace(this, this.constructor);
    }
}
