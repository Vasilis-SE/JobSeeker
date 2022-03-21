import { NextFunction, Router } from 'express';
import BaseController from '../controllers/baseController';
import LogController from '../controllers/log';
import UserController from '../controllers/user';
import { InjectedRequest, InjectedResponse } from '../interfaces/express';
import Security from '../security/security';

const userRoutes = Router();
const _security = new Security();
const _logger = new LogController();
const _baseController = new BaseController();
const _controller = new UserController();

/**
 * Route that handles the creation of a user.
 * @access /api/v1/user
 */
userRoutes.post(
    '/',
    (req: InjectedRequest, res: InjectedResponse, next: NextFunction) => _logger.logIncomingRequest(req, res, next),
    (req: InjectedRequest, res: InjectedResponse, next: NextFunction) => _controller.createUser(req, res, next),
    (req: InjectedRequest, res: InjectedResponse, next: NextFunction) => _baseController.send(req, res, next),
);

/**
 * Route that handles the retrieval of user's profile.
 * @access /api/v1/user/profile
 */
userRoutes.get(
    '/profile',
    (req: InjectedRequest, res: InjectedResponse, next: NextFunction) => _logger.logIncomingRequest(req, res, next),
    (req: InjectedRequest, res: InjectedResponse, next: NextFunction) => _security.authenticate(req, res, next),
    (req: InjectedRequest, res: InjectedResponse, next: NextFunction) => _controller.getUserProfile(req, res, next),
    (req: InjectedRequest, res: InjectedResponse, next: NextFunction) => _baseController.send(req, res, next),
);

/**
 * Route that handles the login of a user.
 * @access /api/v1/user/login
 */
userRoutes.post(
    '/login',
    (req: InjectedRequest, res: InjectedResponse, next: NextFunction) => _logger.logIncomingRequest(req, res, next),
    (req: InjectedRequest, res: InjectedResponse, next: NextFunction) => _controller.loginUser(req, res, next),
    (req: InjectedRequest, res: InjectedResponse, next: NextFunction) => _security.generateUserToken(req, res, next),
    (req: InjectedRequest, res: InjectedResponse, next: NextFunction) => _baseController.send(req, res, next),
);

/**
 * Route that handles the logout of a user.
 * @access /api/v1/user/logout
 */
userRoutes.delete(
    '/logout',
    (req: InjectedRequest, res: InjectedResponse, next: NextFunction) => _logger.logIncomingRequest(req, res, next),
    (req: InjectedRequest, res: InjectedResponse, next: NextFunction) => _security.authenticate(req, res, next),
    (req: InjectedRequest, res: InjectedResponse, next: NextFunction) => _controller.logoutUser(req, res, next),
    (req: InjectedRequest, res: InjectedResponse, next: NextFunction) => _baseController.send(req, res, next),
);

export default userRoutes;
