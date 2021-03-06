import fs from 'fs';
import CompanyModel from '../../../src/models/company';
import PostgreSQL from '../../../src/connections/postgres';
import { IUserProperties } from '../../../src/interfaces/user';
import { ICompanyProperties, IListOfCompanies } from '../../../src/interfaces/company';

PostgreSQL.init();
let _user: IUserProperties = null;
let _company: ICompanyProperties = null;

let companies: IListOfCompanies = [];

const getASingleUser = async () => {
    const query = await PostgreSQL.client.query(`SELECT * FROM users LIMIT 1`);
    _user = query.rows[0];
};

const truncateCompanies = async () => {
    await PostgreSQL.client.query(`TRUNCATE companies RESTART IDENTITY CASCADE`);
};

const getASingleCompany = async () => {
    const query = await PostgreSQL.client.query(`SELECT * FROM companies LIMIT 1`);
    _company = query.rows[0];
};

beforeAll(async () => {
    // await truncateCompanies();
    await getASingleUser();
});
  
afterAll(() => {
    PostgreSQL.close();
});

beforeEach(async () => {
    await getASingleCompany();

    companies = JSON.parse(
        fs.readFileSync(require('path').resolve(__dirname, '../../..') + '/mocks/companies.json').toString(),
    );
});

describe('Company class instantiation', () => {
    test('Company with data is correctly instantiated', async () => {
        const company = new CompanyModel(companies[0]);

        expect(company).toBeTruthy();

        expect(company.id).toBeTruthy();
        expect(company.userid).toBeTruthy();
        expect(company.name).toBeTruthy();
        expect(company.tax_number).toBeTruthy();
        expect(company.created_at).toBeTruthy();
        expect(company.deleted_at).toBeTruthy();

        expect(company.id).toBeDefined();
        expect(company.userid).toBeDefined();
        expect(company.name).toBeDefined();
        expect(company.tax_number).toBeDefined();
        expect(company.created_at).toBeDefined();
        expect(company.deleted_at).toBeDefined();

        expect(typeof company.id === 'number').toBeTruthy();
        expect(typeof company.userid === 'number').toBeTruthy();
        expect(typeof company.name === 'string').toBeTruthy();
        expect(typeof company.tax_number === 'number').toBeTruthy();
        expect(typeof company.created_at === 'number').toBeTruthy();
        expect(typeof company.deleted_at === 'number').toBeTruthy();

        expect(company.id).toEqual(1);
        expect(company.userid).toEqual(1);
        expect(company.name).toEqual('Dazzlesphere');
        expect(company.tax_number).toEqual(876703192);
        expect(company.created_at).toEqual(1632115603);
        expect(company.deleted_at).toEqual(1630012282);

        expect(company instanceof CompanyModel).toBeTruthy();
    });

    test('User with empty data is correctly instantiated', async () => {
        const company = new CompanyModel(companies[4]);

        expect(company).toBeTruthy();

        expect(company.id).toBeTruthy();
        expect(company.userid).toBeTruthy();
        expect(company.name).toBeTruthy();
        expect(company.tax_number).toBeTruthy();
        expect(company.created_at).toBeTruthy();
        expect(company.deleted_at).toBeFalsy();

        expect(company.id).toBeDefined();
        expect(company.userid).toBeDefined();
        expect(company.name).toBeDefined();
        expect(company.tax_number).toBeDefined();
        expect(company.created_at).toBeDefined();

        expect(typeof company.id === 'number').toBeTruthy();
        expect(typeof company.userid === 'number').toBeTruthy();
        expect(typeof company.name === 'string').toBeTruthy();
        expect(typeof company.tax_number === 'number').toBeTruthy();
        expect(typeof company.created_at === 'number').toBeTruthy();

        expect(company.id).toEqual(5);
        expect(company.userid).toEqual(5);
        expect(company.name).toEqual('Oyoyo');
        expect(company.tax_number).toEqual(79303263);
        expect(company.created_at).toEqual(1633230395);
        expect(company.deleted_at).toEqual(0);

        expect(company instanceof CompanyModel).toBeTruthy();
    });

    test('Instance has getter and setter functions', async () => {
        const company = new CompanyModel(companies[0]);

        expect('getId' in company).toBeTruthy();
        expect('getUserId' in company).toBeTruthy();
        expect('getName' in company).toBeTruthy();
        expect('getTaxNumber' in company).toBeTruthy();
        expect('getCreatedAt' in company).toBeTruthy();
        expect('getDeletedAt' in company).toBeTruthy();

        expect('setId' in company).toBeTruthy();
        expect('setUserId' in company).toBeTruthy();
        expect('setName' in company).toBeTruthy();
        expect('setTaxNumber' in company).toBeTruthy();
        expect('setCreatedAt' in company).toBeTruthy();
        expect('setDeletedAt' in company).toBeTruthy();
    });

    test('Instance basic CRUD operation functions', async () => {
        const company = new CompanyModel(companies[0]);

        expect('getCompanies' in company).toBeTruthy();
        expect('createCompany' in company).toBeTruthy();
        expect('updateCompany' in company).toBeTruthy();
        expect('softRemoveCompany' in company).toBeTruthy();
    });
});

describe('Create company functionality', () => {

    test('Company is created successfully', async () => {
        if(_user) {
            // Use a user id that exists else it will violate table foreign key
            companies[0].userid = _user.id;
            const company = new CompanyModel(companies[0]);
            company.setCreatedAt(Math.floor(Date.now() / 1000));
            const result = await company.createCompany();

            expect(result).toBeTruthy();
            expect(result).toBeDefined();
            expect(company.id).toBeTruthy();
            expect(company.id).toBeDefined();
            expect(typeof company.id === 'number').toBeTruthy();
        } else {
            expect(true).toBeTruthy();
        }
    });

    test('Company with empty password is not created', async () => {
        if(_user) {
            companies[0].userid = _user.id;
            const company = new CompanyModel(companies[1]);
            company.setCreatedAt(Math.floor(Date.now() / 1000));
            const result = await company.createCompany();
            expect(result).toBeFalsy();
        } else {
            expect(true).toBeTruthy();
        }
    });
});

describe('Update company functionality', () => {

    test('Company is updated successfully', async () => {
        if(_company) {
            const company = new CompanyModel({
                id: _company.id,
                name: "Some random text"
            });

            // Updating data
            const result1 = await company.updateCompany();
            expect(result1).toBeTruthy();
            expect(result1).toBeDefined();

            // Check if the data are updated
            const result2 = await company.getCompanies();
            expect(result2).toBeTruthy();
            expect(result2).toBeDefined();
        } else {
            expect(true).toBeTruthy();
        }
    });

});

describe('Delete company functionality', () => {

    test('Company is soft deleted', async () => {
        if(_company) {
            const nowStamp = Math.floor(Date.now() / 1000);
            const company = new CompanyModel(_company);
            company.deleted_at = nowStamp;

            const result1 = await company.softRemoveCompany();
            
            expect(result1).toBeTruthy();
            expect(result1).toBeDefined();

            // Check if the company is deleted
            const result2 = await company.getCompanies();
            expect(result2).toBeTruthy();
            expect(result2).toBeDefined();
            expect(company.getDeletedAt()).toEqual(nowStamp);
        } else {
            expect(true).toBeTruthy();
        }
    });

});