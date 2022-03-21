import { InvalidParameterType } from '../exceptions/validation';
import { FilterGlobals, IQueryFilters, ISQLFilters } from '../interfaces/filters';
import Validator from './validator';

export default class Filters {
    static _sqlFilters(filters: IQueryFilters) {
        const final: ISQLFilters = {};

        // Set order by filter
        final.orderby = `${FilterGlobals.QUERY_ORDER_FIELD} ${FilterGlobals.QUERY_SORT_METHOD}`;
        if ('order' in filters && filters.order && 'sort' in filters && filters.sort)
            final.orderby = `${filters.order} ${filters.sort}`;

        let page = 0;
        if ('page' in filters && filters.page) {
            if (!Validator.isNumber(filters.page.toString())) throw new InvalidParameterType('', 'page', 'number');
            page = Number(filters.page);
        }

        let limit = FilterGlobals.QUERY_LENGTH;
        if ('limit' in filters && filters.limit) {
            if (!Validator.isNumber(filters.limit.toString())) throw new InvalidParameterType('', 'limit', 'number');
            limit = Number(filters.limit);
        }

        const offset = page * limit;
        final.limit = `${limit} OFFSET ${offset}`;

        return final;
    }

    static _elasticFilters(filters: IQueryFilters) {

    }
}
