import PostgreSQL from '../../../src/connections/postgres';
import Fetch from '../../../src/helpers/fetch';
import { IUserProperties } from '../../../src/interfaces/user';

PostgreSQL.init();
let _user: IUserProperties = {
    username: 'e2eTestUser',
    password: 'e2ePass1234565789',
};

const checkForUnitTestUser = async () => {
    // We want to remove the user that will handle the e2e test if he exists
    const query = `DELETE FROM users WHERE username = $1`;
    await PostgreSQL.client.query(query, [_user.username]);
};

beforeAll(async () => {
    await checkForUnitTestUser();
});

afterAll(() => {
    PostgreSQL.close();
});

beforeEach(async () => {
    _user = {
        username: 'e2eTestUser',
        password: 'e2ePass1234565789',
    };
});

describe('User creation REST endpoint', () => {

    test('Missing property on body payload should return error response', async () => {
        const response = await Fetch.post('http://localhost:3100/api/v1/user', { username: 'e2eTestUser' });

        expect(response).toBeTruthy();
        expect(response).toBeDefined();

        expect('httpCode' in response).toBeTruthy();
        expect('status' in response).toBeTruthy();
        expect('errorCode' in response).toBeTruthy();
        expect('property' in response).toBeTruthy();
        expect('message' in response).toBeTruthy();

        expect(typeof response.httpCode === 'number').toBeTruthy();
        expect(typeof response.status === 'boolean').toBeTruthy();
        expect(typeof response.errorCode === 'string').toBeTruthy();
        expect(typeof response.property === 'string').toBeTruthy();
        expect(typeof response.message === 'string').toBeTruthy();

        expect(response.httpCode).toEqual(404);
    });

    test('Weak password should return error response', async () => {
        _user.password = '123';
        const response = await Fetch.post('http://localhost:3100/api/v1/user', _user);

        expect(response).toBeTruthy();
        expect(response).toBeDefined();

        expect('httpCode' in response).toBeTruthy();
        expect('status' in response).toBeTruthy();
        expect('errorCode' in response).toBeTruthy();
        expect('message' in response).toBeTruthy();

        expect(typeof response.httpCode === 'number').toBeTruthy();
        expect(typeof response.status === 'boolean').toBeTruthy();
        expect(typeof response.errorCode === 'string').toBeTruthy();
        expect(typeof response.message === 'string').toBeTruthy();

        expect(response.httpCode).toEqual(400);
    });

    test('Correct should register the user', async () => {
        const response = await Fetch.post('http://localhost:3100/api/v1/user', _user);

        expect(response).toBeTruthy();
        expect(response).toBeDefined();

        expect('httpCode' in response).toBeTruthy();
        expect('status' in response).toBeTruthy();
        expect('data' in response).toBeTruthy();
        expect('id' in response.data).toBeTruthy();
        expect('username' in response.data).toBeTruthy();
        expect('created_at' in response.data).toBeTruthy();

        expect(typeof response.httpCode === 'number').toBeTruthy();
        expect(typeof response.status === 'boolean').toBeTruthy();
        expect(typeof response.data === 'object').toBeTruthy();
        expect(typeof response.data.id === 'number').toBeTruthy();
        expect(typeof response.data.username === 'string').toBeTruthy();
        expect(typeof response.data.created_at === 'number').toBeTruthy();

        expect(response.status).toEqual(true);
        expect(response.httpCode).toEqual(201);
        expect(response.data.username).toEqual(_user.username);
    });

    test('Trying to register the same user should register return error response', async () => {
        const response = await Fetch.post('http://localhost:3100/api/v1/user', _user);

        expect(response).toBeTruthy();
        expect(response).toBeDefined();

        expect('httpCode' in response).toBeTruthy();
        expect('status' in response).toBeTruthy();
        expect('errorCode' in response).toBeTruthy();
        expect('message' in response).toBeTruthy();

        expect(typeof response.httpCode === 'number').toBeTruthy();
        expect(typeof response.status === 'boolean').toBeTruthy();
        expect(typeof response.errorCode === 'string').toBeTruthy();
        expect(typeof response.message === 'string').toBeTruthy();

        expect(response.status).toEqual(false);
        expect(response.httpCode).toEqual(400);
    });

});

describe('User login REST endpoint', () => {

    test('Missing property on body payload should return error response', async () => {
        const response = await Fetch.post('http://localhost:3100/api/v1/user', { username: 'e2eTestUser' });

        expect(response).toBeTruthy();
        expect(response).toBeDefined();

        expect('httpCode' in response).toBeTruthy();
        expect('status' in response).toBeTruthy();
        expect('errorCode' in response).toBeTruthy();
        expect('property' in response).toBeTruthy();
        expect('message' in response).toBeTruthy();

        expect(typeof response.httpCode === 'number').toBeTruthy();
        expect(typeof response.status === 'boolean').toBeTruthy();
        expect(typeof response.errorCode === 'string').toBeTruthy();
        expect(typeof response.property === 'string').toBeTruthy();
        expect(typeof response.message === 'string').toBeTruthy();
        
        expect(response.status).toEqual(false);
        expect(response.httpCode).toEqual(404);
    });

    test('Invalid login credentials should return error response', async () => {
        _user.password = 'somethingelse';
        const response = await Fetch.post('http://localhost:3100/api/v1/user', _user);

        expect(response).toBeTruthy();
        expect(response).toBeDefined();

        expect('httpCode' in response).toBeTruthy();
        expect('status' in response).toBeTruthy();
        expect('errorCode' in response).toBeTruthy();
        expect('message' in response).toBeTruthy();

        expect(typeof response.httpCode === 'number').toBeTruthy();
        expect(typeof response.status === 'boolean').toBeTruthy();
        expect(typeof response.errorCode === 'string').toBeTruthy();
        expect(typeof response.message === 'string').toBeTruthy();

        expect(response.status).toEqual(false);
        expect(response.httpCode).toEqual(400);
    });

    test('Correct login credentials should login user & render JWT', async () => {
        const response = await Fetch.post('http://localhost:3100/api/v1/user/login', _user);

        expect(response).toBeTruthy();
        expect(response).toBeDefined();

        expect('httpCode' in response).toBeTruthy();
        expect('status' in response).toBeTruthy();
        expect('data' in response).toBeTruthy();
        expect('token' in response.data).toBeTruthy();
        expect('exp' in response.data).toBeTruthy();

        expect(typeof response.httpCode === 'number').toBeTruthy();
        expect(typeof response.status === 'boolean').toBeTruthy();
        expect(typeof response.data === 'object').toBeTruthy();
        expect(typeof response.data.token == 'string').toBeTruthy();
        expect(typeof response.data.exp == 'number').toBeTruthy();

        expect(response.status).toEqual(true);
        expect(response.httpCode).toEqual(200);
        expect(response.data.token != '').toEqual(true);
        expect(response.data.exp > 0).toEqual(true);
    });
});

describe('User logout REST endpoint', () => {

    test('Invalid token given to logout should return error response', async () => {
        const response = await Fetch.delete('http://localhost:3100/api/v1/user/logout', {'Authorization': 'JWT wrongJWT'});

        expect(response).toBeTruthy();
        expect(response).toBeDefined();

        expect('httpCode' in response).toBeTruthy();
        expect('status' in response).toBeTruthy();
        expect('message' in response).toBeTruthy();
        expect('errorCode' in response).toBeTruthy();

        expect(typeof response.httpCode === 'number').toBeTruthy();
        expect(typeof response.status === 'boolean').toBeTruthy();
        expect(typeof response.errorCode === 'string').toBeTruthy();
        expect(typeof response.message === 'string').toBeTruthy();
        
        expect(response.status).toEqual(false);
        expect(response.httpCode).toEqual(400);
    });

    test('Correct token given to logout should logout user', async () => {
        // First login user
        const loginResp = await Fetch.post('http://localhost:3100/api/v1/user/login', _user);
        const token = loginResp.data.token;
        const header = {'Authorization': `JWT ${token}`};
        const response = await Fetch.delete('http://localhost:3100/api/v1/user/logout', header);

        console.log(response);

        expect(response).toBeTruthy();
        expect(response).toBeDefined();

        expect('httpCode' in response).toBeTruthy();
        expect('status' in response).toBeTruthy();
        expect('data' in response).toBeTruthy();
        expect('id' in response.data).toBeTruthy();

        expect(typeof response.httpCode === 'number').toBeTruthy();
        expect(typeof response.status === 'boolean').toBeTruthy();
        expect(typeof response.data === 'object').toBeTruthy();
        expect(typeof response.data.id === 'number').toBeTruthy();
        
        expect(response.status).toEqual(true);
        expect(response.httpCode).toEqual(200);
    });
});
