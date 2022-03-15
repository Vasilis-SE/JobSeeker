export interface IJobProperties {
    id?: number;
    companyid?: number;
    title?: string;
    description?: string;
    created_at?: number;
    deleted_at?: number;
}

export interface ICompany extends IJobProperties {
    getId(): number;
    getCompanyId(): number;
    getTitle(): string;
    getDescription(): string;
    getCreatedAt(): number;
    getDeletedAt(): number;

    setId(id: number): void;
    setCompanyId(companyid: number): void;
    setTitle(title: string): void;
    setDescription(description: string): void;
    setCreatedAt(created_at: number): void;
    setDeletedAt(deleted_at: number): void;
}

export enum CompanyGlobals {
    TITLE_MAXLENGTH = 60,
    QUERY_LENGTH = 10,
    QUERY_ORDER_FIELD = 'id',
    QUERY_SORT_METHOD = 'ASC',
}

export interface IJobFilters {
    fields?: Array<string>;
    orderby?: string;
    limit?: string;
}

export type IListOfCompanies = Array<IJobProperties>;