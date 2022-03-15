import { NextFunction } from 'express';
import { InjectedRequest, InjectedResponse } from '../interfaces/express';
import { IFailedResponse, ISuccessfulResponse } from '../interfaces/response';
import { IUserProperties } from '../interfaces/user';

/**
 * Controller class for 'company' domain. All those class functions are connected
 * directly with one or more routes.
 */
export default class CompanyController {
    // private _service: UserService;

    constructor() {
        // this._service = new UserService();
    }

    async getCompanies(req: InjectedRequest, res: InjectedResponse, next: NextFunction): Promise<void> {
        const params: IUserProperties = { id: req.user.id };
        const response: ISuccessfulResponse | IFailedResponse = await this._service.getUsers(params, {});
        res.response = response;
        next();
    }
}
