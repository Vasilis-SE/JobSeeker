export interface IQueryFilters {
    page?: number;
    limit?: number;
    order?: string;
    sort?: string;
}

export interface ISQLFilters {
    fields?: Array<string>;
    orderby?: string;
    limit?: string;
}

export enum FilterGlobals {
    QUERY_LENGTH = 10,
    QUERY_ORDER_FIELD = 'id',
    QUERY_SORT_METHOD = 'ASC',
}