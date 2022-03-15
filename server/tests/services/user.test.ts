import { UserGlobals } from "../../src/interfaces/user";
import UserService from "../../src/services/user";

describe('User service class _getUserFilters function check', () => {

    test('Passing filters returns correct output', async () => {
        const filters = {
            page: 0,
            limit: 10,
            order: 'id',
            sort: 'ASC',
        };
        let _service = new UserService();
        const result = await _service._getUserFilters(filters);

        expect(result).toBeTruthy();
        expect(typeof result).toBe('object');
        expect(Object.keys(result)).toEqual(expect.arrayContaining(['orderby', 'limit']));
        expect(result.orderby).not.toBeNull();
        expect(result.limit).not.toBeNull();
        
        const calcOffset = filters.page * filters.limit;
        expect(result.orderby).toEqual(`${filters.order} ${filters.sort}`);
        expect(result.limit).toEqual(`${filters.limit} OFFSET ${calcOffset}`);
    });

    test('Empty filters returns fallback values', async () => {
        const filters = {};
        let _service = new UserService();
        const result = await _service._getUserFilters(filters);

        expect(result).toBeTruthy();
        expect(typeof result).toBe('object');
        expect(Object.keys(result)).toEqual(expect.arrayContaining(['orderby', 'limit']));
        expect(result.orderby).not.toBeNull();
        expect(result.limit).not.toBeNull();
        
        const calcOffset = 0 * UserGlobals.QUERY_LENGTH;
        expect(result.orderby).toEqual(`${UserGlobals.QUERY_ORDER_FIELD} ${UserGlobals.QUERY_SORT_METHOD}`);
        expect(result.limit).toEqual(`${UserGlobals.QUERY_LENGTH} OFFSET ${calcOffset}`);
    });

});
