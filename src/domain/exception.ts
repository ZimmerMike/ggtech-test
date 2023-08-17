export class Exception extends Error {
    public description?: string;
    public exceptionArray?: Array<Exception> | Array <any>;

    constructor(message: string, description?: string, exceptionArray?: Array<Exception>) {
        super(message);
        this.description = description;
        this.exceptionArray = exceptionArray;

        Error.captureStackTrace(this, this.constructor);
    }
}