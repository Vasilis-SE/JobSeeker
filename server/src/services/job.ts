import {
    CouldNotDeleteResource,
    CouldNotFindResource,
    FailedRemoveResourceFromCache,
    FailedToCacheResource,
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
import { IQueryFilters } from '../interfaces/filters';
import { IJobProperties, IJobSearch, JobGlobals } from '../interfaces/job';
import { IFailedResponse, ISuccessfulResponse } from '../interfaces/response';
import { IUserProperties } from '../interfaces/user';
import CompanyModel from '../models/company';
import JobModel from '../models/job';

export default class JobService {
    async createJob(payload: IJobProperties, user: IUserProperties): Promise<ISuccessfulResponse | IFailedResponse> {
        try {
            const validProperties = ['companyid', 'title', 'description'];
            if (Object.keys(payload).length > validProperties.length) throw new ExcessiveBodyProperties();

            if (!('companyid' in payload) || !payload.companyid) throw new PropertyIsMissing('', 'companyid');
            if (!('title' in payload) || !payload.title) throw new PropertyIsMissing('', 'title');
            if (!('description' in payload) || !payload.description) throw new PropertyIsMissing('', 'description');

            if (!Validator.isNumber(payload.companyid.toString()))
                throw new InvalidPropertyType('', 'integer', 'companyid');
            if (typeof payload.title !== 'string') throw new InvalidPropertyType('', 'string', 'title');
            if (typeof payload.description !== 'string') throw new InvalidPropertyType('', 'string', 'description');

            if (payload.title.length > JobGlobals.TITLE_MAXLENGTH)
                throw new InvalidLength('', 'title', `>=${JobGlobals.TITLE_MAXLENGTH}`);

            if (Validator.hasSpecialCharacters(payload.title, '_ALLEXCDD')) throw new ContainsInvalidChars('', 'title');
            if (Validator.hasSpecialCharacters(payload.description, '_ALLEXCDD'))
                throw new ContainsInvalidChars('', 'description');

            // Check if the given company id for which the job will be created, if it
            // exists and if it was created by the user that is creating now this job.
            const _companyModel = new CompanyModel();
            _companyModel.setUserId(user.id);
            _companyModel.setId(payload.companyid);
            if (!(await _companyModel.getCompanies())) throw new CouldNotFindResource();

            const _model = new JobModel();
            _model.setTitle(payload.title);
            _model.setCompanyId(payload.companyid);

            // Check if job exists with its title and the same company.
            const exists = await _model.getJobs();
            if (exists) throw new ResourceAlreadyExists();

            // Populate rest of data & add new job
            _model.setDescription(payload.description);
            _model.setCreatedAt(Math.floor(Date.now() / 1000));
            if (!(await _model.createJob())) throw new FailedToCreateResource();

            // After successful creation add the job to elastic
            if (!(await _model.addJobToElastic())) throw new FailedToCacheResource();

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
                !(e instanceof CouldNotFindResource) &&
                !(e instanceof ResourceAlreadyExists) &&
                !(e instanceof FailedToCacheResource) &&
                !(e instanceof FailedToCreateResource)
            )
                throw e;

            const errorResource: any = { status: false, ...ObjectHandler.getResource(e) };
            const error: IFailedResponse = errorResource;
            return error;
        }
    }

    async updateJob(job: IJobProperties, user: IUserProperties): Promise<ISuccessfulResponse | IFailedResponse> {
        try {
            if (Object.keys(job).length <= 1) throw new RequestBodyIsEmpty();

            if (!('id' in job) || !job.id) throw new PropertyIsMissing('', 'id');

            if (!Validator.isNumber(job.id.toString())) throw new InvalidPropertyType('', 'integer', 'id');
            if ('companyid' in job && !Validator.isNumber(job.companyid.toString()))
                throw new InvalidPropertyType('', 'integer', 'companyid');
            if ('title' in job && typeof job.title !== 'string') throw new InvalidPropertyType('', 'string', 'title');
            if ('description' in job && typeof job.description !== 'string')
                throw new InvalidPropertyType('', 'string', 'description');

            if ('title' in job && job.title.length != JobGlobals.TITLE_MAXLENGTH)
                throw new InvalidLength('', 'title', `>=${JobGlobals.TITLE_MAXLENGTH}`);

            if ('title' in job && Validator.hasSpecialCharacters(job.title, '_ALLEXCDD'))
                throw new ContainsInvalidChars('', 'title');
            if ('description' in job && Validator.hasSpecialCharacters(job.description, '_ALLEXCDD'))
                throw new ContainsInvalidChars('', 'description');

            // Check if job exists.
            const _model = new JobModel();
            _model.setId(job.id);

            const exists = await _model.getJobs();
            if (!exists) throw new CouldNotFindResource();

            // Check if the given company id for which the job will be created, if it
            // exists and if it was created by the user that is creating now this job.
            if ('companyid' in job) {
                const _companyModel = new CompanyModel();
                _companyModel.setUserId(user.id);
                _companyModel.setId(job.companyid);

                if (!(await _companyModel.getCompanies())) throw new CouldNotFindResource();
            }

            // Populate data & update
            _model._setProperties(job);

            if (!(await _model.updateJob())) throw new FailedToUpdateResource();

            const response: ISuccessfulResponse = {
                status: true,
                httpCode: HttpCodes.OK,
                data: ObjectHandler.getResource(_model),
            };
            return response;
        } catch (e) {
            if (
                !(e instanceof InvalidParameterType) &&
                !(e instanceof RequestBodyIsEmpty) &&
                !(e instanceof PropertyIsMissing) &&
                !(e instanceof InvalidPropertyType) &&
                !(e instanceof InvalidLength) &&
                !(e instanceof ContainsInvalidChars) &&
                !(e instanceof CouldNotFindResource) &&
                !(e instanceof FailedToUpdateResource)
            )
                throw e;

            const errorResource: any = { status: false, ...ObjectHandler.getResource(e) };
            const error: IFailedResponse = errorResource;
            return error;
        }
    }

    async deleteJob(job: IJobProperties, user: IUserProperties): Promise<ISuccessfulResponse | IFailedResponse> {
        try {
            if (!('id' in job) || !job.id) throw new PropertyIsMissing('', 'id');

            if (!Validator.isNumber(job.id.toString())) throw new InvalidPropertyType('', 'integer', 'id');

            // Check if job exists.
            const _model = new JobModel();
            _model.setId(job.id);

            const exists = await _model.getJobs();
            if (!exists) throw new CouldNotFindResource();

            // Check if company is already been deleted
            if (exists[0].deleted_at > 0) throw new ResourceIsAlreadyDeleted();

            // Check if the job's company is created by the user trying to delete it
            const _companyModel = new CompanyModel();
            _companyModel.setUserId(user.id);
            _companyModel.setId(exists[0].companyid);
            if (!(await _companyModel.getCompanies())) throw new CouldNotFindResource();

            // Delete job
            let nowStamp = Math.floor(Date.now() / 1000);
            exists[0].deleted_at = nowStamp;
            _model.setDeletedAt(nowStamp);
            if (!(await _model.softRemoveJob())) throw new CouldNotDeleteResource();

            // After successfull deletion of job, remove it also from elastic
            if(!await _model.removeJobFromElastic())
                throw new FailedRemoveResourceFromCache();

            const response: ISuccessfulResponse = {
                status: true,
                httpCode: HttpCodes.OK,
                data: ObjectHandler.getResource(exists),
            };
            return response;
        } catch (e) {
            if (
                !(e instanceof InvalidParameterType) &&
                !(e instanceof PropertyIsMissing) &&
                !(e instanceof InvalidPropertyType) &&
                !(e instanceof CouldNotFindResource) &&
                !(e instanceof ResourceIsAlreadyDeleted) &&
                !(e instanceof FailedRemoveResourceFromCache) &&
                !(e instanceof CouldNotDeleteResource)
            )
                throw e;

            const errorResource: any = { status: false, ...ObjectHandler.getResource(e) };
            const error: IFailedResponse = errorResource;
            return error;
        }
    }

    async searchJobs(search: IJobSearch, query: IQueryFilters): Promise<ISuccessfulResponse | IFailedResponse> {
        try {
            if (!search || !('query' in search)) throw new PropertyIsMissing('', 'query');
            if (Validator.hasSpecialCharacters(search.query, '_ALLEXCDD')) throw new ContainsInvalidChars('', 'query');
            
            const _model = new JobModel();
            const results = await _model.searchJobsBasedOnTitleAndDescription(search.query);
            if (!results) throw new CouldNotFindResource();

            const response: ISuccessfulResponse = {
                status: true,
                httpCode: HttpCodes.OK,
                data: ObjectHandler.getResource(results),
            };
            return response;
        } catch (e) {
            if (
                !(e instanceof InvalidParameterType) &&
                !(e instanceof PropertyIsMissing) &&
                !(e instanceof ContainsInvalidChars) &&
                !(e instanceof CouldNotFindResource)
            )
                throw e;

            const errorResource: any = { status: false, ...ObjectHandler.getResource(e) };
            const error: IFailedResponse = errorResource;
            return error;
        }
    }
}
