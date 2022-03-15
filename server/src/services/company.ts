import { ContainsInvalidChars, ExcessiveBodyProperties, InputExceedMaxLimit, InvalidPropertyType, PropertyIsMissing } from "../exceptions/validation";
import ObjectHandler from "../helpers/objectHandler";
import Validator from "../helpers/validator";
import { CompanyGlobals, ICompanyProperties } from "../interfaces/company";
import { IFailedResponse, ISuccessfulResponse } from "../interfaces/response";
import { IUserProperties } from "../interfaces/user";

export default class CompanyService {

    async createCompany(payload: ICompanyProperties, user: IUserProperties): Promise<ISuccessfulResponse | IFailedResponse> {
        try {
            const validProperties = ['name'];
            if (Object.keys(payload).length > validProperties.length) 
                throw new ExcessiveBodyProperties();

            if (!('name' in payload) || !payload.name) throw new PropertyIsMissing('', 'name');
            if (typeof payload.name !== 'string') throw new InvalidPropertyType('', 'string', 'payload');

            if (Validator.hasSpecialCharacters(payload.name, '_ALL')) 
                throw new ContainsInvalidChars('', 'username');

            if (payload.name.length > CompanyGlobals.NAME_MAXLENGTH) 
                throw new InputExceedMaxLimit('', 'username');


                

            return null;
        } catch (e) {
            if (!(e instanceof ExcessiveBodyProperties))
                throw e;

            const errorResource: any = { status: false, ...ObjectHandler.getResource(e) };
            const error: IFailedResponse = errorResource;
            return error;
        }
    }

}