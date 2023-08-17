"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Exception = void 0;
class Exception extends Error {
    constructor(message, description, exceptionArray) {
        super(message);
        this.description = description;
        this.exceptionArray = exceptionArray;
        Error.captureStackTrace(this, this.constructor);
    }
}
exports.Exception = Exception;
