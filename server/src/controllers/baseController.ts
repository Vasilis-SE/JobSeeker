import { NextFunction, Response } from 'express';
import { InjectedRequest, InjectedResponse } from '../interfaces/express';

/**
 * Base controller class that contain middleware for all routes.
 */
export default class BaseController {
    /**
     * Middleware function that is called always last and responds the results
     * back to the caller.
     * @param req The express request object
     * @param res The express response object
     * @returns Returns express response object
     */
    public send(req: InjectedRequest, res: InjectedResponse, next: NextFunction): Response {
        if (!('response' in res)) return res.sendStatus(500);

        const response = res.response;
        const httpCode = response.httpCode;
        return res.status(httpCode).json(response);
    }
}
