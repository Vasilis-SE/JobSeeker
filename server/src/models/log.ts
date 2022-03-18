import PostgreSQL from '../connections/postgres';
import { ILog, ILogIncomingRequestProperties, ILogProperties } from '../interfaces/log';

export default class LogModel implements ILog {
    id!: number;
    data!: ILogIncomingRequestProperties;
    created_at!: number;

    constructor(log: ILogProperties = {}) {
        this._setProperties(log);
    }

    private _setProperties(log: ILogProperties = {}): void {
        this.setId(log.id ? log.id : 0);
        this.setCreatedAt(log.created_at ? log.created_at : 0);
    }

    async logIncomingRequests(): Promise<boolean> {
        try {
            const queryStr = `INSERT INTO log_ir (ip, uri, body, created_at) 
                VALUES ($1, $2, $3, $4) 
                RETURNING id`;

            const logData: ILogIncomingRequestProperties = this.getData();
            const query = await PostgreSQL.client.query(queryStr, [
                logData.ip,
                logData.uri,
                logData.body,
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


    getId(): number {
        return this.id;
    }
    getCreatedAt(): number {
        return this.created_at;
    }
    getData(): ILogIncomingRequestProperties {
        return this.data;
    }
    setId(id: number): void {
        this.id = Number(id);
    }
    setCreatedAt(created_at: number): void {
        this.created_at = Number(created_at);
    }
    setData(data: ILogIncomingRequestProperties): void {
        this.data = data;
    }
}