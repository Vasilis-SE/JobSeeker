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

export class FailedToUpdateCompany implements IException {
    status: boolean;
    message: string;
    errorCode: string;
    httpCode: number;

    constructor(message?: string) {
        this.status = false;
        this.message = message ? message : 'Error occurred, failed to update company info...';
        this.errorCode = 'cp3';
        this.httpCode = HttpCodes.SERVER_ERROR;
    }
}

export class CouldNotFindCompany implements IException {
    status: boolean;
    message: string;
    errorCode: string;
    httpCode: number;

    constructor(message?: string) {
        this.status = false;
        this.message = message ? message : 'Could not find company with the given criteria...';
        this.errorCode = 'cp4';
        this.httpCode = HttpCodes.NOT_FOUND;
    }
}

export class CouldNotDeleteCompany implements IException {
    status: boolean;
    message: string;
    errorCode: string;
    httpCode: number;

    constructor(message?: string) {
        this.status = false;
        this.message = message ? message : 'Error occured, could not delete company...';
        this.errorCode = 'cp5';
        this.httpCode = HttpCodes.SERVER_ERROR;
    }
}

export class CompanyIsAlreadyDeleted implements IException {
    status: boolean;
    message: string;
    errorCode: string;
    httpCode: number;

    constructor(message?: string) {
        this.status = false;
        this.message = message ? message : 'This particular company is already deleted...';
        this.errorCode = 'cp6';
        this.httpCode = HttpCodes.BAD_REQUEST;
    }
}