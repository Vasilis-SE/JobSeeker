import { HttpCodes } from '../helpers/httpCodesEnum';
import IException from '../interfaces/exceptions';

export class CompanyAlreadyExists implements IException {
    status: boolean;
    message: string;
    errorCode: string;
    httpCode: number;

    constructor(message?: string) {
        this.status = false;
        this.message = message ? message : 'Company already exists...';
        this.errorCode = 'cp1';
        this.httpCode = HttpCodes.BAD_REQUEST;
    }
}

export class FailedToCreateCompany implements IException {
    status: boolean;
    message: string;
    errorCode: string;
    httpCode: number;

    constructor(message?: string) {
        this.status = false;
        this.message = message ? message : 'Error occurred, failed to create company...';
        this.errorCode = 'cp2';
        this.httpCode = HttpCodes.SERVER_ERROR;
    }
}