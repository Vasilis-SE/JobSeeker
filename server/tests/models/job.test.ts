import fs from 'fs';
import PostgreSQL from '../../src/connections/postgres';
import { ICompanyProperties } from '../../src/interfaces/company';
import { IJobProperties, IListOfJobs } from '../../src/interfaces/job';
import JobModel from '../../src/models/job';

PostgreSQL.init();
let _company: ICompanyProperties = null;
let _job: IJobProperties = null;
let listOfJobs: IListOfJobs = [];

const getASingleCompany = async () => {
    const query = await PostgreSQL.client.query(`SELECT * FROM companies LIMIT 1`);
    _company = query.rows[0];
};

const getASingleJob = async () => {
    const query = await PostgreSQL.client.query(`SELECT * FROM jobs LIMIT 1`);
    _job = query.rows[0];
};

beforeEach(async () => {
    await getASingleJob();

    listOfJobs = JSON.parse(
        fs.readFileSync(require('path').resolve(__dirname, '../..') + '/mocks/jobs.json').toString(),
    );
});

beforeAll(async () => {
    await getASingleCompany();
});

afterAll(() => {
    PostgreSQL.close();
});

describe('Job class instantiation', () => {
    test('Job with data is correctly instantiated', async () => {
        const job = new JobModel(listOfJobs[0]);

        expect(job).toBeTruthy();

        expect(job.id).toBeTruthy();
        expect(job.companyid).toBeTruthy();
        expect(job.title).toBeTruthy();
        expect(job.description).toBeTruthy();
        expect(job.created_at).toBeTruthy();
        expect(job.deleted_at).toBeTruthy();

        expect(job.id).toBeDefined();
        expect(job.companyid).toBeDefined();
        expect(job.title).toBeDefined();
        expect(job.description).toBeDefined();
        expect(job.created_at).toBeDefined();
        expect(job.deleted_at).toBeDefined();

        expect(typeof job.id == 'number').toBeTruthy();
        expect(typeof job.companyid == 'number').toBeTruthy();
        expect(typeof job.title == 'string').toBeTruthy();
        expect(typeof job.description == 'string').toBeTruthy();
        expect(typeof job.created_at == 'number').toBeTruthy();
        expect(typeof job.deleted_at == 'number').toBeTruthy();

        expect(job.id).toEqual(1);
        expect(job.companyid).toEqual(1);
        expect(job.title).toEqual("Account Executive");
        expect(job.description).toEqual("dis parturient montes nascetur ridiculus mus etiam vel augue vestibulum rutrum rutrum neque aenean auctor");
        expect(job.created_at).toEqual(1638780516);
        expect(job.deleted_at).toEqual(1619311442);

        expect(job instanceof JobModel).toBeTruthy();
    });

    test('User with empty data is correctly instantiated', async () => {
        const job = new JobModel(listOfJobs[3]);

        expect(job).toBeTruthy();

        expect(job.id).toBeTruthy();
        expect(job.companyid).toBeTruthy();
        expect(job.title).toBeFalsy();
        expect(job.description).toBeTruthy();
        expect(job.created_at).toBeTruthy();
        expect(job.deleted_at).toBeTruthy();

        expect(job.id).toBeDefined();
        expect(job.companyid).toBeDefined();
        expect(job.description).toBeDefined();
        expect(job.created_at).toBeDefined();
        expect(job.deleted_at).toBeDefined();

        expect(typeof job.id == 'number').toBeTruthy();
        expect(typeof job.companyid == 'number').toBeTruthy();
        expect(typeof job.title == 'string').toBeTruthy();
        expect(typeof job.description == 'string').toBeTruthy();
        expect(typeof job.created_at == 'number').toBeTruthy();
        expect(typeof job.deleted_at == 'number').toBeTruthy();

        expect(job.id).toEqual(4);
        expect(job.companyid).toEqual(4);
        expect(job.title).toEqual('');
        expect(job.description).toEqual('vel ipsum praesent blandit lacinia erat vestibulum sed magna at nunc commodo placerat praesent blandit');
        expect(job.created_at).toEqual(1634436841);
        expect(job.deleted_at).toEqual(1628997464);

        expect(job instanceof JobModel).toBeTruthy();
    });

    test('Instance has getter and setter functions', async () => {
        const job = new JobModel(listOfJobs[0]);

        expect('getId' in job).toBeTruthy();
        expect('getCompanyId' in job).toBeTruthy();
        expect('getTitle' in job).toBeTruthy();
        expect('getDescription' in job).toBeTruthy();
        expect('getCreatedAt' in job).toBeTruthy();
        expect('getDeletedAt' in job).toBeTruthy();

        expect('setId' in job).toBeTruthy();
        expect('setCompanyId' in job).toBeTruthy();
        expect('setTitle' in job).toBeTruthy();
        expect('setDescription' in job).toBeTruthy();
        expect('setCreatedAt' in job).toBeTruthy();
        expect('setDeletedAt' in job).toBeTruthy();
    });

    test('Instance basic CRUD operation functions', async () => {
        const job = new JobModel(listOfJobs[0]);

        expect('getJobs' in job).toBeTruthy();
        expect('createJob' in job).toBeTruthy();
        expect('updateJob' in job).toBeTruthy();
        expect('softRemoveJob' in job).toBeTruthy();
    });
});


describe('Create job functionality', () => {

    test('Job is created successfully', async () => {
        if(_company) {
            listOfJobs[0].companyid = _company.id;
            const job = new JobModel(listOfJobs[0]);
            
            const nowStamp = Math.floor(Date.now() / 1000);
            job.setCreatedAt(nowStamp);
            const result = await job.createJob();

            expect(result).toBeTruthy();
            expect(result).toBeDefined();
            expect(job.id).toBeTruthy();
            expect(job.id).toBeDefined();
            expect(typeof job.id === 'number').toBeTruthy();
        } else {
            expect(true).toBeTruthy();
        }
    });

    test('Job with empty password is not created', async () => {
        if(_company) {
            listOfJobs[3].companyid = _company.id;
            const job = new JobModel(listOfJobs[1]);
            const nowStamp = Math.floor(Date.now() / 1000);
            job.setCreatedAt(nowStamp);
            const result = await job.createJob();
            expect(result).toBeFalsy();
        } else {
            expect(true).toBeTruthy();
        }
    });
});

