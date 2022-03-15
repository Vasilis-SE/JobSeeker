import PostgreSQL from '../connections/postgres';
import RedisClient from '../connections/redis';
import ObjectHandler from '../helpers/objectHandler';
import { IListOfUsers, IUser, IUserFilters, IUserProperties } from '../interfaces/user';

export default class UserModel implements IUser {
    id!: number;
    username!: string;
    password!: string;
    created_at!: number;

    constructor(user: IUserProperties = {}) {
        this._setProperties(user);
    }

    private _setProperties(user: IUserProperties = {}): void {
        this.setId(user.id ? user.id : 0);
        this.setUsername(user.username ? user.username : '');
        this.setPassword(user.password ? user.password : '');
        this.setCreatedAtStamp(user.created_at ? user.created_at : 0);
    }

    async getUsers(filters: IUserFilters = {}): Promise<IListOfUsers | boolean> {
        try {
            let results: IListOfUsers = [];
            const resource = ObjectHandler.getResource(this);
            const wherePart = ObjectHandler.objectToSQLParams(resource, ' AND ');

            const query = await PostgreSQL.client.query(`SELECT 
                ${filters.fields ? filters.fields.join(', ') : '*'}
                FROM users 
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

    async createUser(): Promise<boolean> {
        try {
            const query = await PostgreSQL.client.query(`INSERT INTO users (username, password, created_at) 
                VALUES ('${this.getUsername()}', '${this.getPassword()}', ${this.getCreatedAtStamp()})
                RETURNING id`);
            if (query.rowCount === 0) throw Error();

            // Set the newly created id
            this.setId(query.rows[0].id);
            return true;
        } catch (error) {
            return false;
        }
    }

    async getUserToken(): Promise<string | null> {
        return await RedisClient.client.get(`${process.env.USER_TOKEN_PATH}:${this.getId()}`);
    }

    async setNewUserToken(token: string): Promise<boolean> {
        return await RedisClient.client.set(`${process.env.USER_TOKEN_PATH}:${this.getId()}`, token);
    }

    async setExpirationToToken(seconds: number): Promise<boolean> {
        return await RedisClient.client.expire(`${process.env.USER_TOKEN_PATH}:${this.getId()}`, seconds);
    }

    async deleteUserToken(token: string): Promise<boolean> {
        return await RedisClient.client.del(`${process.env.USER_TOKEN_PATH}:${this.getId()}`);
    }

    getId(): number {
        return this.id;
    }
    getUsername(): string {
        return this.username;
    }
    getPassword(): string {
        return this.password;
    }
    getCreatedAtStamp(): number {
        return this.created_at;
    }
    setId(id: number): void {
        this.id = id;
    }
    setUsername(usr: string): void {
        this.username = usr;
    }
    setPassword(pass: string): void {
        this.password = pass;
    }
    setCreatedAtStamp(ca: number): void {
        this.created_at = ca;
    }
}
