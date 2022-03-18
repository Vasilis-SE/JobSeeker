import { NextFunction } from 'express';
import { InjectedRequest, InjectedResponse } from '../interfaces/express';
import { IJobProperties } from '../interfaces/job';
import { IFailedResponse, ISuccessfulResponse } from '../interfaces/response';
import { IUserProperties } from '../interfaces/user';
import JobService from '../services/job';

/**
 * Controller class for 'job' domain. All those class functions are connected
 * directly with one or more routes.
 */
export default class JobController {
    private _service: JobService;

    constructor() {
        this._service = new JobService();
    }

    async createJob(req: InjectedRequest, res: InjectedResponse, next: NextFunction): Promise<void> {
        const payload: IJobProperties = req.body;
        const user: IUserProperties = req.user;

        const response: ISuccessfulResponse | IFailedResponse = await this._service.createJob(payload, user);
        res.response = response;
        next();
    }

    async updateJob(req: InjectedRequest, res: InjectedResponse, next: NextFunction): Promise<void> {
        const payload: IJobProperties = req.body;
        const params: IJobProperties = req.params;
        const user: IUserProperties = req.user;

        const response: ISuccessfulResponse | IFailedResponse = await this._service.updateJob({...params, ...payload}, user);
        res.response = response;
        next();
    }

    async deleteJob(req: InjectedRequest, res: InjectedResponse, next: NextFunction): Promise<void> {
        const params: IJobProperties = req.params;
        const user: IUserProperties = req.user;

        const response: ISuccessfulResponse | IFailedResponse = await this._service.deleteJob(params, user);
        res.response = response;
        next();
    }
}
