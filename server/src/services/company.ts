import { CompanyAlreadyExists, FailedToCreateCompany } from "../exceptions/company";
import { ContainsInvalidChars, ExcessiveBodyProperties, InputExceedMaxLimit, InvalidParameterType, InvalidPropertyType, PropertyIsMissing } from "../exceptions/validation";
import { HttpCodes } from "../helpers/httpCodesEnum";
import ObjectHandler from "../helpers/objectHandler";
import Validator from "../helpers/validator";
import { CompanyGlobals, ICompanyFilters, ICompanyProperties } from "../interfaces/company";
import { IRequestQueryFilters } from "../interfaces/express";
import { IFailedResponse, ISuccessfulResponse } from "../interfaces/response";
import { IUserProperties } from "../interfaces/user";
import CompanyModel from "../models/company";

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

            const _model = new CompanyModel(payload);

            // Check if company already exists.
            const exists = await _model.getCompanies();
            if(exists) throw new CompanyAlreadyExists();
            
            // Populate rest of data & add new company
            _model.setUserId(user.id);
            _model.setCreatedAt(Math.floor(Date.now() / 1000));
            if(!await _model.createCompany())
                throw new FailedToCreateCompany();
            
            const response: ISuccessfulResponse = {
                status: true,
                httpCode: HttpCodes.OK,
                data: ObjectHandler.getResource(_model),
            };
            return response;
        } catch (e) {
            if (
                !(e instanceof InvalidParameterType) &&
                !(e instanceof ExcessiveBodyProperties) &&
                !(e instanceof InvalidPropertyType) &&
                !(e instanceof ContainsInvalidChars) &&
                !(e instanceof InputExceedMaxLimit) &&
                !(e instanceof CompanyAlreadyExists) &&
                !(e instanceof FailedToCreateCompany)
            ) throw e;
            
            const errorResource: any = { status: false, ...ObjectHandler.getResource(e) };
            const error: IFailedResponse = errorResource;
            return error;
        }
    }





    /**
     * Protected class function of UserService that is used to clear and gather all the
     * filter data needed. Filters are used for managing queries on database. For example
     * ordering a query, calculating the 'chunk' of data to return for pagination etc.
     * @param filters Object of IRequestQueryFilters interface that contains the filters.
     * @returns Object of IUserFilters interface which contains the final filters a query will use.
     */
     public _getUserFilters(filters: IRequestQueryFilters): ICompanyFilters {
        const final: ICompanyFilters = {};

        // Set order by filter
        final.orderby = `${CompanyGlobals.QUERY_ORDER_FIELD} ${CompanyGlobals.QUERY_SORT_METHOD}`;
        if ('order' in filters && filters.order && 'sort' in filters && filters.sort)
            final.orderby = `${filters.order} ${filters.sort}`;

        let page = 0;
        if ('page' in filters && filters.page) {
            if (!Validator.isNumber(filters.page.toString())) 
                throw new InvalidParameterType('', 'page', 'number');
            page = Number(filters.page);
        }

        let limit = CompanyGlobals.QUERY_LENGTH;
        if ('limit' in filters && filters.limit) {
            if (!Validator.isNumber(filters.limit.toString())) 
                throw new InvalidParameterType('', 'limit', 'number');
            limit = Number(filters.limit);
        }

        const offset = page * limit;
        final.limit = `${limit} OFFSET ${offset}`;

        return final;
    }


}