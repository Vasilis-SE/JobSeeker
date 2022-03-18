import { HttpCodes } from '../helpers/httpCodesEnum';
import IException from '../interfaces/exceptions';

export class ResourceAlreadyExists implements IException {
    status: boolean;
    message: string;
    errorCode: string;
    httpCode: number;

    constructor(message?: string) {
        this.status = false;
        this.message = message ? message : 'This resource already exists...';
        this.errorCode = 'rs1';
        this.httpCode = HttpCodes.BAD_REQUEST;
    }
}

export class FailedToCreateResource implements IException {
    status: boolean;
    message: string;
    errorCode: string;
    httpCode: number;

    constructor(message?: string) {
        this.status = false;
        this.message = message ? message : 'Error occured, could not create resource. Please try again later...';
        this.errorCode = 'rs2';
        this.httpCode = HttpCodes.SERVER_ERROR;
    }
}

export class FailedToUpdateResource implements IException {
    status: boolean;
    message: string;
    errorCode: string;
    httpCode: number;

    constructor(message?: string) {
        this.status = false;
        this.message = message ? message : 'Error occured, could not update resource. Please try again later...';
        this.errorCode = 'rs3';
        this.httpCode = HttpCodes.SERVER_ERROR;
    }
}

export class CouldNotFindResource implements IException {
    status: boolean;
    message: string;
    errorCode: string;
    httpCode: number;

    constructor(message?: string) {
        this.status = false;
        this.message = message ? message : 'Resource could not be found with the give criteria...';
        this.errorCode = 'rs4';
        this.httpCode = HttpCodes.NOT_FOUND;
    }
}

export class CouldNotDeleteResource implements IException {
    status: boolean;
    message: string;
    errorCode: string;
    httpCode: number;

    constructor(message?: string) {
        this.status = false;
        this.message = message ? message : 'Error occurred, could not delete resource. Please try again later...';
        this.errorCode = 'rs5';
        this.httpCode = HttpCodes.SERVER_ERROR;
    }
}
export class ResourceIsAlreadyDeleted implements IException {
    status: boolean;
    message: string;
    errorCode: string;
    httpCode: number;

    constructor(message?: string) {
        this.status = false;
        this.message = message ? message : 'The resources seems to already be deleted...';
        this.errorCode = 'rs6';
        this.httpCode = HttpCodes.BAD_REQUEST;
    }
}