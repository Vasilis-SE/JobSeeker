import ObjectHandler from "../helpers/objectHandler";
import { IFailedResponse, ISuccessfulResponse } from "../interfaces/response";

export default class CompanyService {

    async createCompany(): Promise<ISuccessfulResponse | IFailedResponse> {
        try {
            const validProperties = ['username', 'password'];
  
  
            return null;
        } catch (e) {
            // if (!(e instanceof ExcessiveBodyProperties))
            //     throw e;

            const errorResource: any = { status: false, ...ObjectHandler.getResource(e) };
            const error: IFailedResponse = errorResource;
            return error;
        }
    }

}