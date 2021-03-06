import PostgreSQL from "../connections/postgres";
import ObjectHandler from "../helpers/objectHandler";
import { ICompany, ICompanyFilters, ICompanyProperties, IListOfCompanies } from "../interfaces/company";

export default class CompanyModel implements ICompany {
    id!: number;
    userid!: number;
    name!: string;
    tax_number!: number;
    created_at!: number;
    deleted_at!: number;

    constructor(company: ICompanyProperties = {}) {
        this._setProperties(company);
    }

    _setProperties(company: ICompanyProperties = {}): void {
        this.setId(company.id ? company.id : 0);
        this.setUserId(company.userid ? company.userid : 0);
        this.setName(company.name ? company.name : '');
        this.setTaxNumber(company.tax_number ? company.tax_number : 0);
        this.setCreatedAt(company.created_at ? company.created_at : 0);
        this.setDeletedAt(company.deleted_at ? company.deleted_at : 0);
    }

    async getCompanies(filters: ICompanyFilters = {}): Promise<IListOfCompanies | boolean> {
        try {
            let results: IListOfCompanies = [];
            const resource = ObjectHandler.getResource(this);
            const wherePart = ObjectHandler.objectToSQLParams(resource, ' AND ');

            const query = await PostgreSQL.client.query(`SELECT 
                ${filters.fields ? filters.fields.join(', ') : '*'}
                FROM companies 
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

    async createCompany(): Promise<boolean> {
        try {
            const resource: any = ObjectHandler.getResource(this);

            const queryStr = `INSERT INTO companies (userid, name, tax_number, created_at) 
                VALUES ($1, $2, $3, $4) 
                RETURNING id`;

            const query = await PostgreSQL.client.query(queryStr, 
                [resource.userid, resource.name, resource.tax_number, resource.created_at]);

            if (query.rowCount === 0) throw Error();

            // Set the newly created id
            this.setId(query.rows[0].id);
            return true;
        } catch (error) {
            return false;
        }
    }

    async updateCompany(): Promise<boolean> {
        try {
            const resource: any = ObjectHandler.getResource(this);
            delete resource.id;
            delete resource.userid;

            let i = 1;
            let prepStatements = [];
            let values = [];
            for (let [key, value] of Object.entries(resource)) {
                prepStatements.push(` ${key} = $${i} `);
                values.push(value);
                i++;
            }            
            values.push(this.getId());

            const queryStr = `UPDATE companies SET ${prepStatements.join(', ')} WHERE id = $${i}`;
            const query = await PostgreSQL.client.query(queryStr, values);
                
            if (query.rowCount === 0) throw Error();
            return true;
        } catch (error) {
            return false;
        }
    }

    async softRemoveCompany(): Promise<boolean> {
        try {
            const queryStr = `UPDATE companies SET 
                deleted_at = $1
                WHERE id = $2 AND userid = $3`;
            const query = await PostgreSQL.client.query(queryStr, 
                [this.getDeletedAt(), this.getId(), this.getUserId()]);
            if (query.rowCount === 0) throw Error();
            return true;
        } catch (error) {
            return false;
        }
    }


    // Getters - Setters
    getId(): number {
        return this.id;
    }
    getUserId(): number {
        return this.userid;
    }
    getName(): string {
        return this.name;
    }
    getTaxNumber(): number {
        return this.tax_number;
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
    setUserId(userid: number): void {
        this.userid = Number(userid);
    }
    setName(name: string): void {
        this.name = name;
    }
    setTaxNumber(tax_number: number): void {
        this.tax_number = Number(tax_number);
    }
    setCreatedAt(created_at: number): void {
        this.created_at = Number(created_at);
    }
    setDeletedAt(deleted_at: number): void {
        this.deleted_at = Number(deleted_at);
    }
}