import fs from 'fs';
import PostgreSQL from '../../src/connections/postgres';
import { IListOfUsers } from '../../src/interfaces/user';
import UserModel from "../../src/models/user";

PostgreSQL.init();
let users: IListOfUsers = [];
let user: any = null;

const getASingleUser = async () => {
    const query = await PostgreSQL.client.query(`SELECT * FROM users LIMIT 1`);
    user = query.rows[0];
}

beforeAll(() => {
    return getASingleUser();
});
  
beforeEach(() => {
    users = JSON.parse(fs.readFileSync(require('path').resolve(__dirname, '../..')+"/mocks/users.json").toString());
});

afterAll(() => {
    PostgreSQL.close();
});

describe('User class instantiation', () => {
    test('User with data is correctly instantiated', async () => {
        const user = new UserModel(users[0]);

        expect(user).toBeTruthy();

        expect(user.id).toBeTruthy();
        expect(user.username).toBeTruthy();
        expect(user.password).toBeTruthy();

        expect(user.id).toBeDefined();
        expect(user.username).toBeDefined();
        expect(user.password).toBeDefined();

        expect(typeof user.id === 'number').toBeTruthy();
        expect(typeof user.username === 'string').toBeTruthy();
        expect(typeof user.password === 'string').toBeTruthy();
       
        expect(user.id).toEqual(1);
        expect(user.username).toEqual('mhiers0');
        expect(user.password).toEqual('llaTCd');

        expect(user instanceof UserModel).toBeTruthy();
    });

    test('User with empty data is correctly instantiated', async () => {
        const user = new UserModel(users[2]);

        expect(user).toBeTruthy();

        expect(user.id).toBeTruthy();
        expect(user.password).toBeTruthy();

        expect(user.id).toBeDefined();
        expect(user.username).toBeDefined();
        expect(user.password).toBeDefined();

        expect(typeof user.id === 'number').toBeTruthy();
        expect(typeof user.username === 'string').toBeTruthy();
        expect(typeof user.password === 'string').toBeTruthy();
       
        expect(user.id).toEqual(3);
        expect(user.username).toEqual('');
        expect(user.password).toEqual('9P40mY7');

        expect(user instanceof UserModel).toBeTruthy();
    });

    test('Instance has getter and setter functions', async () => {
        const user = new UserModel(users[0]);

        expect("getId" in user).toBeTruthy();
        expect("getUsername" in user).toBeTruthy();
        expect("getPassword" in user).toBeTruthy();
        expect("getCreatedAtStamp" in user).toBeTruthy();
        
        expect("setId" in user).toBeTruthy();
        expect("setUsername" in user).toBeTruthy();
        expect("setPassword" in user).toBeTruthy();
        expect("setCreatedAtStamp" in user).toBeTruthy();
    });

    test('Instance basic CRUD operation functions', async () => {
        const user = new UserModel(users[0]);

        expect("getUsers" in user).toBeTruthy();
        expect("createUser" in user).toBeTruthy();
    });

    test('Instance has CRUD operations for user JWT token', async () => {
        const user = new UserModel(users[0]);

        expect("getUserToken" in user).toBeTruthy();
        expect("setNewUserToken" in user).toBeTruthy();
        expect("setExpirationToToken" in user).toBeTruthy();
        expect("deleteUserToken" in user).toBeTruthy();
    });
});

describe('Create user functionality', () => {
    test('User is created successfully', async () => {
        const userInst = new UserModel(users[0]);
        userInst.setCreatedAtStamp(Math.floor(Date.now() / 1000));
        const result = await userInst.createUser();

        expect(result).toBeTruthy();
        expect(result).toBeDefined();
        expect(userInst.id).toBeTruthy();
        expect(userInst.id).toBeDefined();
        expect(typeof userInst.id === 'number').toBeTruthy();    
    });

    test('User with empty password is not created', async () => {
        const userInst = new UserModel(users[4]);
        userInst.setCreatedAtStamp(Math.floor(Date.now() / 1000));
        const result = await userInst.createUser();
    
        expect(result).toBeFalsy();
    });
});

describe('Get user functionality', () => {

    test('Get users returns data if there are any', async () => {
        if(user) {    
            const userInst = new UserModel();
            const results = await userInst.getUsers();

            expect(results).toBeTruthy();
            expect(results).toBeDefined();

            expect(results[0].id).toBeTruthy();
            expect(results[0].username).toBeTruthy();
            expect(results[0].password).toBeTruthy();
            expect(results[0].created_at).toBeTruthy();

            expect(typeof results[0].id === 'number').toBeTruthy();
            expect(typeof results[0].username === 'string').toBeTruthy();
            expect(typeof results[0].password === 'string').toBeTruthy();
            expect(typeof results[0].created_at === 'number').toBeTruthy();
        } else {
            expect(true).toBeTruthy();
        }
    });

});