import { NextFunction } from 'express';
import { InjectedRequest, InjectedResponse } from '../interfaces/express';
import { ILogIncomingRequestProperties } from '../interfaces/log';
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
            uri: req.originalUrl,
            body: JSON.stringify(req.body),
        };

        this._service.logIncomingRequests(log);
        next();
    }
}
