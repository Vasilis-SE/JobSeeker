export interface IUserProperties {
    id?: number;
    username?: string;
    password?: string;
    created_at?: number;
}

export interface IUser extends IUserProperties {
    getId(): number;
    getUsername(): string;
    getPassword(): string;
    getCreatedAtStamp(): number;

    setId(id?: number): void;
    setUsername(usr?: string): void;
    setPassword(pass?: string): void;
    setCreatedAtStamp(ca?: number): void;
}

export enum UserGlobals {
    USERNAME_MAXLENGTH = 30,
    PASSWORD_MINLENGTH = 6,
    QUERY_LENGTH = 10,
    QUERY_ORDER_FIELD = 'id',
    QUERY_SORT_METHOD = 'ASC',
}

export interface IUserFilters {
    fields?: Array<string>; // Fields are used on queries to fetch specific fields
    orderby?: string; // Order by for the query
    limit?: string; // Limit for the query
}

export type IListOfUsers = Array<IUserProperties>;

export interface IUserTokenContent {
    id: number;
}
