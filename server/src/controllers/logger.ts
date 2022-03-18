import { NextFunction } from 'express';
import { InjectedRequest, InjectedResponse } from '../interfaces/express';
import { ILogIncomingRequestProperties } from '../interfaces/log';
import { IFailedResponse, ISuccessfulResponse } from '../interfaces/response';
import LogService from '../services/log';

/**
 * Controller class for 'log' domain. All those class functions are connected
 * directly with one or more routes.
 */
export default class LogController {
    private _service: LogService;

    constructor() {
        this._service = new LogService();
    }

    async logIncomingRequest(req: InjectedRequest, res: InjectedResponse, next: NextFunction): Promise<void> {
        const log: ILogIncomingRequestProperties = {
            ip: req.ip,
            uri: req.url,
            body: req.body,
        };

        const response: ISuccessfulResponse | IFailedResponse = await this._service.logIncomingRequests(log);
        res.response = response;
        next();
    }
}
