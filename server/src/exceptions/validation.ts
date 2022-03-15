import IException from '../interfaces/exceptions';
import { HttpCodes } from '../helpers/httpCodesEnum';

export class PropertyIsMissing implements IException {
    public status: boolean;
    public message: string;
    public errorCode: string;
    public httpCode: number;
    public property?: string;

    constructor(message?: string, p?: string) {
        this.status = false;
        this.message = message ? message : 'Property is missing from the request...';
        this.errorCode = 'ev1';
        this.httpCode = HttpCodes.NOT_FOUND;
        this.property = p;
    }
}

export class InvalidPropertyType implements IException {
    public status: boolean;
    public message: string;
    public errorCode: string;
    public httpCode: number;
    public property?: string;
    public expected?: string;

    constructor(message?: string, p?: string, ex?: string) {
        this.status = false;
        this.message = message ? message : 'Invalid property type give...';
        this.errorCode = 'ev2';
        this.httpCode = HttpCodes.BAD_REQUEST;
        this.property = p;
        this.expected = ex;
    }
}

export class ExcessiveBodyProperties implements IException {
    public status: boolean;
    public message: string;
    public errorCode: string;
    public httpCode: number;

    constructor(message?: string) {
        this.status = false;
        this.message = message ? message : 'Excessive properties found inside request body. Check your payload...';
        this.errorCode = 'ev3';
        this.httpCode = HttpCodes.BAD_REQUEST;
    }
}

export class ContainsInvalidChars implements IException {
    public status: boolean;
    public message: string;
    public errorCode: string;
    public httpCode: number;
    public property?: string;

    constructor(message?: string, p?: string) {
        this.status = false;
        this.message = message ? message : 'Contains invalid characters...';
        this.errorCode = 'ev5';
        this.httpCode = HttpCodes.BAD_REQUEST;
        this.property = p;
    }
}

export class PasswordIsWeak implements IException {
    public status: boolean;
    public message: string;
    public errorCode: string;
    public httpCode: number;

    constructor(message?: string) {
        this.status = false;
        this.message = message
            ? message
            : 'The provided password is weak. Type using a combination of lower case, uppers case, numbers, special characters ...';
        this.errorCode = 'ev6';
        this.httpCode = HttpCodes.BAD_REQUEST;
    }
}

export class InputExceedMaxLimit implements IException {
    public status: boolean;
    public message: string;
    public errorCode: string;
    public httpCode: number;
    public property?: string;

    constructor(message?: string, p?: string) {
        this.status = false;
        this.message = message ? message : 'Input exceeds max limit length...';
        this.errorCode = 'ev7';
        this.httpCode = HttpCodes.BAD_REQUEST;
        this.property = p;
    }
}

export class InvalidParameterType implements IException {
    public status: boolean;
    public message: string;
    public errorCode: string;
    public httpCode: number;
    public property?: string;
    public expected?: string;

    constructor(message?: string, p?: string, ex?: string) {
        this.status = false;
        this.message = message ? message : 'Invalid parameter type given...';
        this.errorCode = 'ev8';
        this.httpCode = HttpCodes.BAD_REQUEST;
        this.property = p;
        this.expected = ex;
    }
}

export class InvalidPassword implements IException {
    public status: boolean;
    public message: string;
    public errorCode: string;
    public httpCode: number;

    constructor(message?: string) {
        this.status = false;
        this.message = message ? message : 'It seems the password you have provided is invalid...';
        this.errorCode = 'ev9';
        this.httpCode = HttpCodes.BAD_REQUEST;
    }
}

export class RequestBodyIsEmpty implements IException {
    public status: boolean;
    public message: string;
    public errorCode: string;
    public httpCode: number;

    constructor(message?: string) {
        this.status = false;
        this.message = message ? message : 'Request body is empty. Missing all the necessary data...';
        this.errorCode = 'ev10';
        this.httpCode = HttpCodes.BAD_REQUEST;
    }
}

export class InvalidParameterFormat implements IException {
    public status: boolean;
    public message: string;
    public errorCode: string;
    public httpCode: number;
    public property?: string;
    public expected?: string;

    constructor(message?: string, p?: string, ex?: string) {
        this.status = false;
        this.message = message ? message : 'It seems your parameter has invalid format...';
        this.errorCode = 'ev11';
        this.httpCode = HttpCodes.BAD_REQUEST;
        this.property = p;
        this.expected = ex;
    }
}