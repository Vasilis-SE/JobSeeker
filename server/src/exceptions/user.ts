import { HttpCodes } from '../helpers/httpCodesEnum';
import IException from '../interfaces/exceptions';

export class CouldNotFindUser implements IException {
    status: boolean;
    message: string;
    errorCode: string;
    httpCode: number;

    constructor(message?: string) {
        this.status = false;
        this.message = message ? message : 'Could not find any user(-s) with the given input...';
        this.errorCode = 'eu1';
        this.httpCode = HttpCodes.NOT_FOUND;
    }
}

export class UserAlreadyExists implements IException {
    status: boolean;
    message: string;
    errorCode: string;
    httpCode: number;

    constructor(message?: string) {
        this.status = false;
        this.message = message ? message : 'User already exists with the given criteria...';
        this.errorCode = 'eu2';
        this.httpCode = HttpCodes.BAD_REQUEST;
    }
}

export class UserCreationFailed implements IException {
    status: boolean;
    message: string;
    errorCode: string;
    httpCode: number;

    constructor(message?: string) {
        this.status = false;
        this.message = message ? message : 'Error occurred while trying to create new user...';
        this.errorCode = 'eu3';
        this.httpCode = HttpCodes.SERVER_ERROR;
    }
}

export class UnableToLogout implements IException {
    status: boolean;
    message: string;
    errorCode: string;
    httpCode: number;

    constructor(message?: string) {
        this.status = false;
        this.message = message ? message : 'Error occurred while trying to logout...';
        this.errorCode = 'eu4';
        this.httpCode = HttpCodes.SERVER_ERROR;
    }
}

