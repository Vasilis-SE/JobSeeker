export interface ICompanyProperties {
    id?: number;
    userid?: number;
    name?: string;
    created_at?: number;
    deleted_at?: number;
}

export interface ICompany extends ICompanyProperties {
    getId(): number;
    getUserId(): number;
    getName(): string;
    getCreatedAt(): number;
    getDeletedAt(): number;
    setId(id: number): void;
    setUserId(userid: number): void;
    setName(name: string): void;
    setCreatedAt(created_at: number): void;
    setDeletedAt(deleted_at: number): void;
}

export enum CompanyGlobals {
    NAME_MAXLENGTH = 40,
    QUERY_LENGTH = 10,
    QUERY_ORDER_FIELD = 'id',
    QUERY_SORT_METHOD = 'ASC',
}

export interface ICompanyFilters {
    fields?: Array<string>;
    orderby?: string;
    limit?: string;
}

export type IListOfCompanies = Array<ICompanyProperties>;