export interface ILogProperties {
    id?: number;
    data?: ILogIncomingRequestProperties;
    created_at?: number;
}

export interface ILog extends ILogProperties {
    getId(): number;
    getCreatedAt(): number;
    getData(): ILogIncomingRequestProperties;
    setId(id: number): void;
    setCreatedAt(created_at: number): void;
    setData(data: ILogIncomingRequestProperties): void;
}

export interface ILogIncomingRequestProperties {
    ip?: string;
    uri?: string;
    body?: string;
}

export type IListOfLogs = Array<ILogProperties>;
export type IListOfIncomingRequestLogs = Array<ILogIncomingRequestProperties>;