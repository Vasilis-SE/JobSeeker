import IException from './exceptions';

export interface ISuccessfulResponseData {
    [key: string]: any;
}

export interface IMetaProperties {
    _num: number;
    _pages: number;
    _prev: string;
    _next: string;
}


export interface ISuccessfulResponse {
    status: boolean;
    httpCode: number;
    meta?: IMetaProperties;
    data?: ISuccessfulResponseData;
}

export type IFailedResponse = IException;
