import response from './response';
import user from './user';
import company from './company';
import job from './job';
import queryParams from './queryParams';

export = {
    "schemas": {
        ...response,
        ...user,
        ...company,
        ...job,
        ...queryParams
    }
};