import { FailedToCreateJob, JobAlreadyExists } from "../exceptions/job";
import { ContainsInvalidChars, ExcessiveBodyProperties, InvalidLength, InvalidParameterType, InvalidPropertyType, PropertyIsMissing } from "../exceptions/validation";
import { HttpCodes } from "../helpers/httpCodesEnum";
import ObjectHandler from "../helpers/objectHandler";
import Validator from "../helpers/validator";
import { IRequestQueryFilters } from "../interfaces/express";
import { IJobFilters, IJobProperties, JobGlobals } from "../interfaces/job";
import { IFailedResponse, ISuccessfulResponse } from "../interfaces/response";
import { IUserProperties } from "../interfaces/user";
import JobModel from "../models/job";

export default class CompanyService {

    async createJob(payload: IJobProperties): Promise<ISuccessfulResponse | IFailedResponse> {
        try {
            const validProperties = ['companyid', 'title', 'description'];
            if (Object.keys(payload).length > validProperties.length) throw new ExcessiveBodyProperties();
            
            if (!('companyid' in payload) || !payload.companyid) throw new PropertyIsMissing('', 'companyid');
            if (!('title' in payload) || !payload.title) throw new PropertyIsMissing('', 'title');
            if (!('description' in payload) || !payload.description) throw new PropertyIsMissing('', 'description');

            if (!Validator.isNumber(payload.companyid.toString())) 
                throw new InvalidPropertyType('', 'integer', 'companyid');
            if (typeof payload.title !== 'string') 
                throw new InvalidPropertyType('', 'string', 'title');
            if (typeof payload.description !== 'string') 
                throw new InvalidPropertyType('', 'string', 'description');
            
            if (payload.title.length != JobGlobals.TITLE_MAXLENGTH)
                throw new InvalidLength('', 'title', `>=${JobGlobals.TITLE_MAXLENGTH}`);

            if (Validator.hasSpecialCharacters(payload.title, '_ALLEXCDD')) 
                throw new ContainsInvalidChars('', 'title');
            if (Validator.hasSpecialCharacters(payload.description, '_ALLEXCDD')) 
                throw new ContainsInvalidChars('', 'description');

            const _model = new JobModel();
            _model.setTitle(payload.title);
            _model.setCompanyId(payload.companyid);

            // Check if job exists with its title and the same company.
            const exists = await _model.getJobs();
            if (exists) throw new JobAlreadyExists();

            // Populate rest of data & add new job
            _model.setCreatedAt(Math.floor(Date.now() / 1000));
            if (!(await _model.createJob())) 
                throw new FailedToCreateJob();

            const response: ISuccessfulResponse = {
                status: true,
                httpCode: HttpCodes.CREATED,
                data: ObjectHandler.getResource(_model),
            };
            return response;
        } catch (e) {
            if (
                !(e instanceof InvalidParameterType) &&
                !(e instanceof ExcessiveBodyProperties) &&
                !(e instanceof PropertyIsMissing) &&
                !(e instanceof InvalidPropertyType) &&
                !(e instanceof InvalidLength) &&
                !(e instanceof ContainsInvalidChars) &&
                !(e instanceof JobAlreadyExists) &&
                !(e instanceof FailedToCreateJob)
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
    public _getCompanyFilters(filters: IRequestQueryFilters): IJobFilters {
        const final: IJobFilters = {};

        // Set order by filter
        final.orderby = `${JobGlobals.QUERY_ORDER_FIELD} ${JobGlobals.QUERY_SORT_METHOD}`;
        if ('order' in filters && filters.order && 'sort' in filters && filters.sort)
            final.orderby = `${filters.order} ${filters.sort}`;

        let page = 0;
        if ('page' in filters && filters.page) {
            if (!Validator.isNumber(filters.page.toString())) throw new InvalidParameterType('', 'page', 'number');
            page = Number(filters.page);
        }

        let limit = JobGlobals.QUERY_LENGTH;
        if ('limit' in filters && filters.limit) {
            if (!Validator.isNumber(filters.limit.toString())) throw new InvalidParameterType('', 'limit', 'number');
            limit = Number(filters.limit);
        }

        const offset = page * limit;
        final.limit = `${limit} OFFSET ${offset}`;

        return final;
    }
}
