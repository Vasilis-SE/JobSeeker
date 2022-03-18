import { ILogIncomingRequestProperties } from "../interfaces/log";
import { IFailedResponse, ISuccessfulResponse } from "../interfaces/response";

export default class LogService {

    async logIncomingRequests(log: ILogIncomingRequestProperties): Promise<ISuccessfulResponse | IFailedResponse> {
        try {
            console.log(log);   
         
        } catch (error) {
            return null;
        }
    }

}