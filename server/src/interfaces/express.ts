import { Request } from 'express';
import { IUserProperties } from './user';
import { Response } from 'express';
import { IFailedResponse, ISuccessfulResponse } from './response';

export interface InjectedRequest extends Request {
    user: IUserProperties;
}

export interface InjectedResponse extends Response {
    response: ISuccessfulResponse | IFailedResponse;
}

export interface IRequestQueryFilters {
    page?: number;
    limit?: number;
    order?: string;
    sort?: string;
}
