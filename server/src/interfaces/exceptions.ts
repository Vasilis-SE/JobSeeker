export default interface IException {
    status: boolean;
    message: string;
    errorCode: string;
    httpCode: number;

    // Optional
    parameter?: string;
    property?: string;
    expected?: string;
}
