import {
    CouldNotDeleteResource,
    CouldNotFindResource,
    FailedToCreateResource,
    FailedToUpdateResource,
    ResourceAlreadyExists,
    ResourceIsAlreadyDeleted,
} from '../exceptions/resource';
import {
    ContainsInvalidChars,
    ExcessiveBodyProperties,
    InvalidLength,
    InvalidParameterType,
    InvalidPropertyType,
    PropertyIsMissing,
    RequestBodyIsEmpty,
} from '../exceptions/validation';
import { HttpCodes } from '../helpers/httpCodesEnum';
import ObjectHandler from '../helpers/objectHandler';
import Validator from '../helpers/validator';
import { CompanyGlobals, ICompanyProperties } from '../interfaces/company';
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
            if (exists) throw new ResourceAlreadyExists();

            // Populate rest of data & add new company
            _model.setUserId(user.id);
            _model.setCreatedAt(Math.floor(Date.now() / 1000));
            if (!(await _model.createCompany())) throw new FailedToCreateResource();

            const response: ISuccessfulResponse = {
                status: true,
                httpCode: HttpCodes.CREATED,
                data: ObjectHandler.getResource(_model),
            };
            return response;
        } catch (e) {
            if (
                !(e instanceof PropertyIsMissing) &&
                !(e instanceof ExcessiveBodyProperties) &&
                !(e instanceof PropertyIsMissing) &&
                !(e instanceof InvalidPropertyType) &&
                !(e instanceof ContainsInvalidChars) &&
                !(e instanceof InvalidLength) &&
                !(e instanceof ResourceAlreadyExists) &&
                !(e instanceof FailedToCreateResource)
            )
                throw e;

            const errorResource: any = { status: false, ...ObjectHandler.getResource(e) };
            const error: IFailedResponse = errorResource;
            return error;
        }
    }

    async updateCompany(
        company: ICompanyProperties,
        user: IUserProperties,
    ): Promise<ISuccessfulResponse | IFailedResponse> {
        try {
            if (Object.keys(company).length <= 1) throw new RequestBodyIsEmpty();

            if (!('id' in company) || !company.id) throw new PropertyIsMissing('', 'id');

            if (!Validator.isNumber(company.id.toString())) 
                throw new InvalidPropertyType('', 'integer', 'id');
            if ('name' in company && typeof company.name !== 'string') 
                throw new InvalidPropertyType('', 'string', 'name');
            if ('tax_number' in company && !Validator.isNumber(company.tax_number.toString()))
                throw new InvalidPropertyType('', 'integer', 'tax_number');

            if ('name' in company && Validator.hasSpecialCharacters(company.name, '_ALL')) 
                throw new ContainsInvalidChars('', 'username');

            if ('tax_number' in company && company.tax_number.toString().length != CompanyGlobals.TAX_NUM_LENGTH)
                throw new InvalidLength('', 'tax_number', `=${CompanyGlobals.TAX_NUM_LENGTH}`);
            if ('name' in company && company.name.length > CompanyGlobals.NAME_MAXLENGTH)
                throw new InvalidLength('', 'username', `<=${CompanyGlobals.NAME_MAXLENGTH}`);

            // Check if company exists.
            const _model = new CompanyModel();
            _model.setId(company.id);
            _model.setUserId(user.id);

            const exists = await _model.getCompanies();
            if (!exists) throw new CouldNotFindResource();

            // Populate rest of data & add new company
            _model._setProperties(company);
            if (!(await _model.updateCompany())) 
                throw new FailedToUpdateResource();

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
                !(e instanceof PropertyIsMissing) &&
                !(e instanceof InvalidPropertyType) &&
                !(e instanceof ContainsInvalidChars) &&
                !(e instanceof InvalidLength) &&
                !(e instanceof CouldNotFindResource) &&
                !(e instanceof FailedToUpdateResource)
            )
                throw e;

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

            if (!Validator.isNumber(params.id.toString())) throw new InvalidPropertyType('', 'integer', 'id');

            const _model = new CompanyModel();
            _model.setId(params.id);
            _model.setUserId(user.id);

            // Check if company exists with the given company id and user id.
            const exists = await _model.getCompanies();
            if (!exists) throw new CouldNotFindResource();

            // Check if company is already been deleted
            if (exists[0].deleted_at > 0) throw new ResourceIsAlreadyDeleted();

            // Soft delte company by settign deleted_at field
            _model.setDeletedAt(Math.floor(Date.now() / 1000));
            if (!(await _model.softRemoveCompany())) throw new CouldNotDeleteResource();

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
                !(e instanceof PropertyIsMissing) &&
                !(e instanceof InvalidPropertyType) &&
                !(e instanceof CouldNotFindResource) &&
                !(e instanceof ResourceIsAlreadyDeleted) &&
                !(e instanceof CouldNotDeleteResource)
            )
                throw e;

            const errorResource: any = { status: false, ...ObjectHandler.getResource(e) };
            const error: IFailedResponse = errorResource;
            return error;
        }
    }
}
