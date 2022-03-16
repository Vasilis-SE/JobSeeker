import { IJob, IJobProperties } from "../interfaces/job";

export default class CompanyModel implements IJob {
    id!: number;
    companyid!: number;
    title!: string;
    description!: string;
    created_at!: number;
    deleted_at!: number;

    constructor(job: IJobProperties = {}) {
        this._setProperties(job);
    }

    private _setProperties(job: IJobProperties = {}): void {
        this.setId(job.id ? job.id : 0)
        this.setCompanyId(job.companyid ? job.companyid : 0)
        this.setTitle(job.title ? job.title : '')
        this.setDescription(job.description ? job.description : '')
        this.setCreatedAt(job.created_at ? job.created_at : 0)
        this.setDeletedAt(job.deleted_at ? job.deleted_at : 0)
    }

    // TODO: Get jobs
    // TODO: Create a new job
    // TODO: Update a current job
    // TODO: Soft delete a job








    // Getters - Setters
    getId(): number {
        return this.id;
    }
    getCompanyId(): number {
        return this.companyid;
    }
    getTitle(): string {
        return this.title;
    }
    getDescription(): string {
        return this.description;
    }
    getCreatedAt(): number {
        return this.created_at;
    }
    getDeletedAt(): number {
        return this.deleted_at;
    }

    setId(id: number): void {
        this.id = Number(id);
    }
    setCompanyId(companyid: number): void {
        this.companyid = Number(companyid);
    }
    setTitle(title: string): void {
        this.title = title;
    }
    setDescription(description: string): void {
        this.description = description;
    }
    setCreatedAt(created_at: number): void {
        this.created_at = Number(created_at);
    }
    setDeletedAt(deleted_at: number): void {
        this.deleted_at = Number(deleted_at);
    }
}