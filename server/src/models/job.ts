import ElasticClient from '../connections/elastic';
import PostgreSQL from '../connections/postgres';
import ObjectHandler from '../helpers/objectHandler';
import { IJob, IJobFilters, IJobProperties, IListOfJobs } from '../interfaces/job';

export default class JobModel implements IJob {
    id!: number;
    companyid!: number;
    title!: string;
    description!: string;
    created_at!: number;
    deleted_at!: number;

    constructor(job: IJobProperties = {}) {
        this._setProperties(job);
    }

    _setProperties(job: IJobProperties = {}): void {
        this.setId(job.id ? job.id : 0);
        this.setCompanyId(job.companyid ? job.companyid : 0);
        this.setTitle(job.title ? job.title : '');
        this.setDescription(job.description ? job.description : '');
        this.setCreatedAt(job.created_at ? job.created_at : 0);
        this.setDeletedAt(job.deleted_at ? job.deleted_at : 0);
    }

    async getJobs(filters: IJobFilters = {}): Promise<IListOfJobs | boolean> {
        try {
            let results: IListOfJobs = [];
            const resource = ObjectHandler.getResource(this);
            const wherePart = ObjectHandler.objectToSQLParams(resource, ' AND ');

            const query = await PostgreSQL.client.query(`SELECT 
                ${filters.fields ? filters.fields.join(', ') : '*'}
                FROM jobs 
                ${wherePart ? `WHERE ${wherePart}` : ''}
                ${'orderby' in filters ? `ORDER BY ${filters.orderby}` : ''}
                ${'limit' in filters ? `LIMIT ${filters.limit}` : ''}`);
            if (query.rowCount === 0) throw Error();

            results = query.rows;
            return results;
        } catch (error) {
            return false;
        }
    }

    async createJob(): Promise<boolean> {
        try {
            const queryStr = `INSERT INTO jobs (companyid, title, description, created_at) 
                VALUES ($1, $2, $3, $4) 
                RETURNING id`;
            const query = await PostgreSQL.client.query(queryStr, [
                this.getCompanyId(),
                this.getTitle(),
                this.getDescription(),
                this.getCreatedAt(),
            ]);

            if (query.rowCount === 0) throw Error();

            // Set the newly created id
            this.setId(query.rows[0].id);
            return true;
        } catch (error) {
            return false;
        }
    }

    async updateJob(): Promise<boolean> {
        try {
            const resource: any = ObjectHandler.getResource(this);
            delete resource.id;

            let i = 1;
            let prepStatements = [];
            let values = [];
            for (let [key, value] of Object.entries(resource)) {
                prepStatements.push(` ${key} = $${i} `);
                values.push(value);
                i++;
            }
            values.push(this.getId());

            const queryStr = `UPDATE jobs SET
                ${prepStatements.join(', ')}
                WHERE id = $${i}`;
            const query = await PostgreSQL.client.query(queryStr, values);

            if (query.rowCount === 0) throw Error();
            return true;
        } catch (error) {
            return false;
        }
    }

    async softRemoveJob(): Promise<boolean> {
        try {
            const queryStr = `UPDATE jobs SET 
                deleted_at = $1
                WHERE id = $2`;
            const query = await PostgreSQL.client.query(queryStr, [this.getDeletedAt(), this.getId()]);
            if (query.rowCount === 0) throw Error();
            return true;
        } catch (error) {
            return false;
        }
    }

    async addJobToElastic(): Promise<boolean> {
        try {
            const result = await ElasticClient.client.index({
                index: process.env.ELASTIC_JOB_INDEX,
                body: ObjectHandler.getResource(this),
            });

            return true;
        } catch (error) {
            return false;
        }
    }

    async removeJobFromElastic(): Promise<boolean> {
        try {
            const result = await ElasticClient.client.deleteByQuery({
                index: process.env.ELASTIC_JOB_INDEX,
                body: {
                    query: {
                        match: { id: this.getId() },
                    },
                },
            });

            return true;
        } catch (error) {
            return false;
        }
    }

    async clearJobsFromElastic(): Promise<boolean> {
        try {
            const result = await ElasticClient.client.deleteByQuery({
                index: process.env.ELASTIC_JOB_INDEX,
                body: {
                    query: {
                        match_all: {},
                    },
                },
            });

            return true;
        } catch (error) {
            return false;
        }
    }

    async searchJobsBasedOnTitleAndDescription(searchQuery: string): Promise<IListOfJobs | boolean> {
        try {
            let results: IListOfJobs = [];
            const searchResult = await ElasticClient.client.search({
                index: process.env.ELASTIC_JOB_INDEX,
                body: {
                    query: {
                        bool: {
                            must: [
                                {
                                    match: {
                                        title: searchQuery,
                                    },
                                },
                                {
                                    match: {
                                        description: searchQuery,
                                    },
                                },
                            ],
                        },
                    },
                },
            });

            for (let jobHit of searchResult.hits.hits) {
                results.push(jobHit._source);
            }

            return results;
        } catch (error) {
            return false;
        }
    }

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
