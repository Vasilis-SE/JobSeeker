import { CouldNotFindResource, FailedToCreateResource, ResourceAlreadyExists } from '../exceptions/resource';
import { FailedToRenderHash } from '../exceptions/security';
import { UnableToLogout } from '../exceptions/user';
import {
    ContainsInvalidChars,
    ExcessiveBodyProperties,
    InvalidLength,
    InvalidParameterType,
    InvalidPassword,
    InvalidPropertyType,
    PasswordIsWeak,
    PropertyIsMissing,
} from '../exceptions/validation';
import Filters from '../helpers/filters';
import { HttpCodes } from '../helpers/httpCodesEnum';
import ObjectHandler from '../helpers/objectHandler';
import Validator from '../helpers/validator';
import { IQueryFilters } from '../interfaces/filters';
import { IFailedResponse, ISuccessfulResponse } from '../interfaces/response';
import { IListOfUsers, IUserFilters, IUserProperties, UserGlobals } from '../interfaces/user';
import UserModel from '../models/user';
import Password from '../security/password';

export default class UserService {
    async createUser(payload: IUserProperties): Promise<ISuccessfulResponse | IFailedResponse> {
        try {
            const validProperties = ['username', 'password'];
            if (Object.keys(payload).length > validProperties.length) throw new ExcessiveBodyProperties();

            if (!('username' in payload) || !payload.username) throw new PropertyIsMissing('', 'username');
            if (!('password' in payload) || !payload.password) throw new PropertyIsMissing('', 'password');
            if (typeof payload.username !== 'string') throw new InvalidPropertyType('', 'string', 'username');
            if (typeof payload.password !== 'string') throw new InvalidPropertyType('', 'string', 'password');

            if (Validator.hasSpecialCharacters(payload.username, '_ALL')) 
                throw new ContainsInvalidChars('', 'username');
            if (payload.username.length > UserGlobals.USERNAME_MAXLENGTH) 
                throw new InvalidLength('', 'username', `<=${UserGlobals.USERNAME_MAXLENGTH}`);

            // Check if password is strong & hash it
            const _password = new Password(payload.password);
            if (!(await _password.isPasswordStrong())) throw new PasswordIsWeak();
            if (!(await _password.hashPassword())) throw new FailedToRenderHash();

            // Populate only the user in the model to check whether there is
            // already any other user with the same username.
            const _model = new UserModel();
            _model.setUsername(payload.username);

            const exists: IListOfUsers | boolean = await _model.getUsers();
            if (exists) throw new ResourceAlreadyExists();

            // Set to model the hashed password
            _model.setPassword(_password.getPassword());
            _model.setCreatedAtStamp(Math.floor(Date.now() / 1000));

            if (!(await _model.createUser())) throw new FailedToCreateResource();

            _model.setPassword(''); // clean passowrd so that it wont be displayed on response
            const response: ISuccessfulResponse = {
                status: true,
                httpCode: HttpCodes.CREATED,
                data: ObjectHandler.getResource(_model),
            };
            return response;
        } catch (e) {
            if (
                !(e instanceof ExcessiveBodyProperties) &&
                !(e instanceof ExcessiveBodyProperties) &&
                !(e instanceof PropertyIsMissing) &&
                !(e instanceof InvalidPropertyType) &&
                !(e instanceof ContainsInvalidChars) &&
                !(e instanceof InvalidLength) &&
                !(e instanceof PasswordIsWeak) &&
                !(e instanceof FailedToRenderHash) &&
                !(e instanceof ResourceAlreadyExists) &&
                !(e instanceof FailedToCreateResource)
            )
                throw e;

            const errorResource: any = { status: false, ...ObjectHandler.getResource(e) };
            const error: IFailedResponse = errorResource;
            return error;
        }
    }

    async getUsers(
        user: IUserProperties,
        filters: IQueryFilters,
    ): Promise<ISuccessfulResponse | IFailedResponse> {
        try {
            const finalFilters: IUserFilters = await Filters._sqlFilters(filters);
            const _model = new UserModel(user);

            finalFilters.fields = ['id', 'username', 'created_at'];
            const results: any = await _model.getUsers(finalFilters);
            if (!results) throw new CouldNotFindResource();

            const response: ISuccessfulResponse = {
                status: true,
                httpCode: HttpCodes.OK,
                data: ObjectHandler.getResource(results),
            };
            return response;
        } catch (e) {
            if (
                !(e instanceof CouldNotFindResource) &&
                !(e instanceof InvalidParameterType)
            ) throw e;

            const errorResource: any = { status: false, ...ObjectHandler.getResource(e) };
            const error: IFailedResponse = errorResource;
            return error;
        }
    }

    async loginUser(payload: IUserProperties): Promise<ISuccessfulResponse | IFailedResponse> {
        try {
            if (Object.keys(payload).length > 2) throw new ExcessiveBodyProperties();

            // Check if any is missing
            if (!('username' in payload) || !payload.username) throw new PropertyIsMissing('', 'username');
            if (!('password' in payload) || !payload.password) throw new PropertyIsMissing('', 'password');

            // Check data types
            if (typeof payload.username !== 'string') throw new InvalidPropertyType('', 'string', 'username');
            if (typeof payload.password !== 'string') throw new InvalidPropertyType('', 'string', 'password');

            // Create instance of model and search for user based on the username
            const _model = new UserModel();
            _model.setUsername(payload.username);
            const filters: IQueryFilters = { limit: 1 };
            const foundUserResults: any = await _model.getUsers(Filters._sqlFilters(filters));
            if (!foundUserResults) throw new CouldNotFindResource();

            _model.setId(foundUserResults[0].id);

            // Set hashed password and compare it with the plain password.
            const _password = new Password(foundUserResults[0].password);
            if (!(await _password.comparePassword(payload.password))) throw new InvalidPassword();

            const response: ISuccessfulResponse = {
                status: true,
                httpCode: HttpCodes.OK,
                data: { id: foundUserResults[0].id },
            };
            return response;
        } catch (e) {
            if (
                !(e instanceof ExcessiveBodyProperties) &&
                !(e instanceof PropertyIsMissing) &&
                !(e instanceof InvalidPropertyType) &&
                !(e instanceof CouldNotFindResource) &&
                !(e instanceof InvalidPassword)
            )
                throw e;

            const errorResource: any = { status: false, ...ObjectHandler.getResource(e) };
            const error: IFailedResponse = errorResource;
            return error;
        }
    }

    async logoutUser(user: IUserProperties, token: string): Promise<ISuccessfulResponse | IFailedResponse> {
        try {
            const _model = new UserModel(user);
            if(!await _model.deleteUserToken(token))
                throw new UnableToLogout();

            const response: ISuccessfulResponse = {
                status: true,
                httpCode: HttpCodes.OK,
                data: { id: user.id },
            };
            return response;
        } catch (e) {
            if (!(e instanceof UnableToLogout))
                throw e;

            const errorResource: any = { status: false, ...ObjectHandler.getResource(e) };
            const error: IFailedResponse = errorResource;
            return error;
        }
    }
}
