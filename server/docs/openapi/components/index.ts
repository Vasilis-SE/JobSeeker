import response from './response';
import user from './user';
import queryParams from './queryParams';

export = {
    "schemas": {
        ...response,
        ...user,
        ...queryParams
    }
};