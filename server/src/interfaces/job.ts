export interface IJobProperties {
    id?: number;
    companyid?: number;
    title?: string;
    description?: string;
    created_at?: number;
    deleted_at?: number;
}

export interface IJob extends IJobProperties {
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

export interface IJobSearch {
    query: string;
}

export enum JobGlobals {
    TITLE_MAXLENGTH = 60
}

export type IListOfJobs = Array<IJobProperties>;