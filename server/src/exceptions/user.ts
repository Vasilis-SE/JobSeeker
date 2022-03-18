import { HttpCodes } from '../helpers/httpCodesEnum';
import IException from '../interfaces/exceptions';

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