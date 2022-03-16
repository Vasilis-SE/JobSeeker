import { CompanyAlreadyExists, CompanyIsAlreadyDeleted, CouldNotDeleteCompany, CouldNotFindCompany, FailedToCreateCompany, FailedToUpdateCompany } from '../exceptions/company';
import {
    ContainsInvalidChars,
    ExcessiveBodyProperties,
    InvalidLength,
    InvalidParameterType,
    InvalidPropertyType,
    PropertyIsMissing,
} from '../exceptions/validation';
import { HttpCodes } from '../helpers/httpCodesEnum';
import ObjectHandler from '../helpers/objectHandler';
import Validator from '../helpers/validator';
import { CompanyGlobals, ICompanyFilters, ICompanyProperties } from '../interfaces/company';
import { IRequestQueryFilters } from '../interfaces/express';
import { IFailedResponse, ISuccessfulResponse } from '../interfaces/response';
import { IUserProperties } from '../interfaces/user';
import CompanyModel from '../models/company';

export default class CompanyService {
    async createCompany(
        payload: ICompanyProperties,
        user: IUserProperties,
    ): Promise<ISuccessfulResponse | IFailedResponse> {
        try {
            const validProperties = ['name', 'tax_number'];
            if (Object.keys(payload).length > validProperties.length) throw new ExcessiveBodyProperties();

            if (!('name' in payload) || !payload.name) throw new PropertyIsMissing('', 'name');
            if (!('tax_number' in payload) || !payload.tax_number) throw new PropertyIsMissing('', 'tax_number');

            if (typeof payload.name !== 'string') throw new InvalidPropertyType('', 'string', 'payload');
            if (!Validator.isNumber(payload.tax_number.toString()))
                throw new InvalidPropertyType('', 'integer', 'tax_number');

            if (Validator.hasSpecialCharacters(payload.name, '_ALL')) throw new ContainsInvalidChars('', 'username');

            if (payload.tax_number.toString().length != CompanyGlobals.TAX_NUM_LENGTH)
                throw new InvalidLength('', 'tax_number', `=${CompanyGlobals.TAX_NUM_LENGTH}`);

            if (payload.name.length > CompanyGlobals.NAME_MAXLENGTH)
                throw new InvalidLength('', 'username', `<=${CompanyGlobals.NAME_MAXLENGTH}`);

            const _model = new CompanyModel(payload);

            // Check if company already exists.
            const exists = await _model.getCompanies();
            if (exists) throw new CompanyAlreadyExists();

            // Populate rest of data & add new company
            _model.setUserId(user.id);
            _model.setCreatedAt(Math.floor(Date.now() / 1000));
            if (!(await _model.createCompany())) throw new FailedToCreateCompany();

            const response: ISuccessfulResponse = {
                status: true,
                httpCode: HttpCodes.CREATED,
                data: ObjectHandler.getResource(_model),
            };
            return response;
        } catch (e) {
            if (
                !(e instanceof PropertyIsMissing) &&
                !(e instanceof InvalidParameterType) &&
                !(e instanceof ExcessiveBodyProperties) &&
                !(e instanceof InvalidPropertyType) &&
                !(e instanceof ContainsInvalidChars) &&
                !(e instanceof InvalidLength) &&
                !(e instanceof CompanyAlreadyExists) &&
                !(e instanceof FailedToCreateCompany)
            ) throw e;

            const errorResource: any = { status: false, ...ObjectHandler.getResource(e) };
            const error: IFailedResponse = errorResource;
            return error;
        }
    }

    async updateCompany(
        payload: ICompanyProperties,
        user: IUserProperties,
    ): Promise<ISuccessfulResponse | IFailedResponse> {
        try {
            const validProperties = ['id', 'name', 'tax_number'];
            if (Object.keys(payload).length > validProperties.length) throw new ExcessiveBodyProperties();

            if (!('id' in payload) || !payload.id) throw new PropertyIsMissing('', 'id');
            if (!('name' in payload) || !payload.name) throw new PropertyIsMissing('', 'name');
            if (!('tax_number' in payload) || !payload.tax_number) throw new PropertyIsMissing('', 'tax_number');
            
            if (!Validator.isNumber(payload.id.toString())) throw new InvalidPropertyType('', 'integer', 'id');
            if (typeof payload.name !== 'string') throw new InvalidPropertyType('', 'string', 'payload');
            if (!Validator.isNumber(payload.tax_number.toString())) throw new InvalidPropertyType('', 'integer', 'tax_number');

            if (Validator.hasSpecialCharacters(payload.name, '_ALL')) throw new ContainsInvalidChars('', 'username');

            if (payload.tax_number.toString().length != CompanyGlobals.TAX_NUM_LENGTH)
                throw new InvalidLength('', 'tax_number', `=${CompanyGlobals.TAX_NUM_LENGTH}`);

            if (payload.name.length > CompanyGlobals.NAME_MAXLENGTH)
                throw new InvalidLength('', 'username', `<=${CompanyGlobals.NAME_MAXLENGTH}`);

            const _model = new CompanyModel();
            _model.setId(payload.id);
            _model.setUserId(user.id);

            // Check if company exists with the given company id and user id.
            const exists = await _model.getCompanies();
            if (!exists) throw new CouldNotFindCompany();

            // Populate rest of data & add new company
            _model.setName(payload.name);
            _model.setTaxNumber(payload.tax_number);
            if (!(await _model.updateCompany())) throw new FailedToUpdateCompany();

            // Since everything went well. Get the previous resource update
            // its values and send it as a response back.
            const resource: ICompanyProperties = exists[0];
            resource.name = payload.name;
            resource.tax_number = payload.tax_number;

            const response: ISuccessfulResponse = {
                status: true,
                httpCode: HttpCodes.OK,
                data: ObjectHandler.getResource(resource),
            };
            return response;
        } catch (e) {
            if (
                !(e instanceof InvalidParameterType) &&
                !(e instanceof ExcessiveBodyProperties) &&
                !(e instanceof PropertyIsMissing) &&
                !(e instanceof InvalidPropertyType) &&
                !(e instanceof ContainsInvalidChars) &&
                !(e instanceof InvalidLength) &&
                !(e instanceof CouldNotFindCompany) &&
                !(e instanceof FailedToUpdateCompany)
            ) throw e;

            const errorResource: any = { status: false, ...ObjectHandler.getResource(e) };
            const error: IFailedResponse = errorResource;
            return error;
        }
    }

    async deleteCompany(
        params: ICompanyProperties,
        user: IUserProperties,
    ): Promise<ISuccessfulResponse | IFailedResponse> {
        try {
            const validProperties = ['id'];
            if (Object.keys(params).length > validProperties.length) throw new ExcessiveBodyProperties();

            if (!('id' in params) || !params.id) throw new PropertyIsMissing('', 'id');

            if (!Validator.isNumber(params.id.toString()))
                throw new InvalidPropertyType('', 'integer', 'id');

            const _model = new CompanyModel();
            _model.setId(params.id);
            _model.setUserId(user.id);

            // Check if company exists with the given company id and user id.
            const exists = await _model.getCompanies();
            if (!exists) throw new CouldNotFindCompany();

            // Check if company is already been deleted
            if(exists[0].deleted_at > 0)
                throw new CompanyIsAlreadyDeleted();
            
            // Soft delte company by settign deleted_at field
            _model.setDeletedAt(Math.floor(Date.now() / 1000));
            if(!await _model.softRemoveCompany())
                throw new CouldNotDeleteCompany();

            // Since everything went well. Get the previous resource update
            // its values and send it as a response back.
            const resource: ICompanyProperties = exists[0];
            resource.deleted_at = _model.getDeletedAt();

            // Return success back and also the resource that was soft deleted.
            const response: ISuccessfulResponse = {
                status: true,
                httpCode: HttpCodes.OK,
                data: ObjectHandler.getResource(resource),
            };
            return response;
        } catch (e) {
            if (
                !(e instanceof InvalidParameterType) && 
                !(e instanceof ExcessiveBodyProperties) && 
                !(e instanceof CompanyIsAlreadyDeleted) && 
                !(e instanceof PropertyIsMissing) && 
                !(e instanceof InvalidPropertyType) && 
                !(e instanceof CouldNotFindCompany) && 
                !(e instanceof CouldNotDeleteCompany) 
            ) throw e;
            
            const errorResource: any = { status: false, ...ObjectHandler.getResource(e) };
            const error: IFailedResponse = errorResource;
            return error;
        }
    }


    /**
     * Protected class function of CompanyService that is used to clear and gather all the
     * filter data needed. Filters are used for managing queries on database. For example
     * ordering a query, calculating the 'chunk' of data to return for pagination etc.
     * @param filters Object of IRequestQueryFilters interface that contains the filters.
     * @returns Object of ICompanyFilters interface which contains the final filters a query will use.
     */
    public _getCompanyFilters(filters: IRequestQueryFilters): ICompanyFilters {
        const final: ICompanyFilters = {};

        // Set order by filter
        final.orderby = `${CompanyGlobals.QUERY_ORDER_FIELD} ${CompanyGlobals.QUERY_SORT_METHOD}`;
        if ('order' in filters && filters.order && 'sort' in filters && filters.sort)
            final.orderby = `${filters.order} ${filters.sort}`;

        let page = 0;
        if ('page' in filters && filters.page) {
            if (!Validator.isNumber(filters.page.toString())) throw new InvalidParameterType('', 'page', 'number');
            page = Number(filters.page);
        }

        let limit = CompanyGlobals.QUERY_LENGTH;
        if ('limit' in filters && filters.limit) {
            if (!Validator.isNumber(filters.limit.toString())) throw new InvalidParameterType('', 'limit', 'number');
            limit = Number(filters.limit);
        }

        const offset = page * limit;
        final.limit = `${limit} OFFSET ${offset}`;

        return final;
    }
}
