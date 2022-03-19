import { NextFunction } from 'express';
import { ICompanyProperties } from '../interfaces/company';
import { InjectedRequest, InjectedResponse } from '../interfaces/express';
import { IFailedResponse, ISuccessfulResponse } from '../interfaces/response';
import { IUserProperties } from '../interfaces/user';
import CompanyService from '../services/company';

/**
 * Controller class for 'company' domain. All those class functions are connected
 * directly with one or more routes.
 */
export default class CompanyController {
    private _service: CompanyService;

    constructor() {
        this._service = new CompanyService();
    }

    async createCompany(req: InjectedRequest, res: InjectedResponse, next: NextFunction): Promise<void> {
        const payload: ICompanyProperties = req.body;
        const user: IUserProperties = req.user;

        const response: ISuccessfulResponse | IFailedResponse = await this._service.createCompany(payload, user);
        res.response = response;
        next();
    }

    async updateCompany(req: InjectedRequest, res: InjectedResponse, next: NextFunction): Promise<void> {
        const payload: ICompanyProperties = req.body;
        const params: ICompanyProperties = req.params;
        const user: IUserProperties = req.user;

        const response: ISuccessfulResponse | IFailedResponse = await this._service.updateCompany({...params, ...payload}, user);
        res.response = response;
        next();
    }

    async deleteCompany(req: InjectedRequest, res: InjectedResponse, next: NextFunction): Promise<void> {
        const params: ICompanyProperties = req.params;
        const user: IUserProperties = req.user;

        const response: ISuccessfulResponse | IFailedResponse = await this._service.deleteCompany(params, user);
        res.response = response;
        next();
    }
}
