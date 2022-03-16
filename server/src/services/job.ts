import { ExcessiveBodyProperties, InvalidParameterType } from "../exceptions/validation";
import ObjectHandler from "../helpers/objectHandler";
import Validator from "../helpers/validator";
import { IRequestQueryFilters } from "../interfaces/express";
import { IJobFilters, IJobProperties, JobGlobals } from "../interfaces/job";
import { IFailedResponse, ISuccessfulResponse } from "../interfaces/response";
import { IUserProperties } from "../interfaces/user";

export default class CompanyService {

    async createJob(
        payload: IJobProperties,
        user: IUserProperties,
    ): Promise<ISuccessfulResponse | IFailedResponse> {
        try {
            const validProperties = ['name', 'tax_number'];
            if (Object.keys(payload).length > validProperties.length) throw new ExcessiveBodyProperties();

            return null;
        } catch (e) {
            if (
                !(e instanceof InvalidParameterType) &&
                !(e instanceof ExcessiveBodyProperties)  
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
