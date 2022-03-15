import { HttpCodes } from '../helpers/httpCodesEnum';
import IException from '../interfaces/exceptions';

export class FailedToRenderHash implements IException {
    status: boolean;
    message: string;
    errorCode: string;
    httpCode: number;

    constructor(message?: string) {
        this.status = false;
        this.message = message ? message : 'Could not render hash for password...';
        this.errorCode = 'es1';
        this.httpCode = HttpCodes.SERVER_ERROR;
    }
}

export class InvalidTokenProvided implements IException {
    public status: boolean;
    public message: string;
    public errorCode: string;
    public httpCode: number;

    constructor(message?: string) {
        this.status = false;
        this.message = message ? message : 'Invalid token provided on request header...';
        this.errorCode = 'es2';
        this.httpCode = 400;
    }
}
