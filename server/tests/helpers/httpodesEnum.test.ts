import {HttpCodes} from '../../src/helpers/httpCodesEnum';

describe('Check HTTP codes enum for validity and integrity', () => {
    
    test('Is OK code correct ?', () => {
        expect(HttpCodes.OK).toBeDefined();
        expect(HttpCodes.OK).toBeTruthy();
        expect(typeof HttpCodes.OK).toEqual('number')
        expect(HttpCodes.OK).toEqual(200);
    });

    test('Is CREATED code correct ?', () => {
        expect(HttpCodes.CREATED).toBeDefined();
        expect(HttpCodes.CREATED).toBeTruthy();
        expect(typeof HttpCodes.CREATED).toEqual('number')
        expect(HttpCodes.CREATED).toEqual(201);
    });

    test('Is BAD_REQUEST code correct ?', () => {
        expect(HttpCodes.BAD_REQUEST).toBeDefined();
        expect(HttpCodes.BAD_REQUEST).toBeTruthy();
        expect(typeof HttpCodes.BAD_REQUEST).toEqual('number')
        expect(HttpCodes.BAD_REQUEST).toEqual(400);
    });

    test('Is UNAUTHORIZED code correct ?', () => {
        expect(HttpCodes.UNAUTHORIZED).toBeDefined();
        expect(HttpCodes.UNAUTHORIZED).toBeTruthy();
        expect(typeof HttpCodes.UNAUTHORIZED).toEqual('number')
        expect(HttpCodes.UNAUTHORIZED).toEqual(401);
    });

    test('Is FORBIDDEN code correct ?', () => {
        expect(HttpCodes.FORBIDDEN).toBeDefined();
        expect(HttpCodes.FORBIDDEN).toBeTruthy();
        expect(typeof HttpCodes.FORBIDDEN).toEqual('number')
        expect(HttpCodes.FORBIDDEN).toEqual(403);
    });

    test('Is NOT_FOUND code correct ?', () => {
        expect(HttpCodes.NOT_FOUND).toBeDefined();
        expect(HttpCodes.NOT_FOUND).toBeTruthy();
        expect(typeof HttpCodes.NOT_FOUND).toEqual('number')
        expect(HttpCodes.NOT_FOUND).toEqual(404);
    });

    test('Is SERVER_ERROR code correct ?', () => {
        expect(HttpCodes.SERVER_ERROR).toBeDefined();
        expect(HttpCodes.SERVER_ERROR).toBeTruthy();
        expect(typeof HttpCodes.SERVER_ERROR).toEqual('number')
        expect(HttpCodes.SERVER_ERROR).toEqual(500);
    });

});
