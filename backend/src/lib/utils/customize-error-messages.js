class CustomError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
    }
}

class ValidationError extends Error {
    constructor(errors, statusCode = 400) {
        super("Validation Error");
        this.name = "ValidationError";
        this.statusCode = statusCode;
        this.errors = errors;
    }
}

export { CustomError, ValidationError };
