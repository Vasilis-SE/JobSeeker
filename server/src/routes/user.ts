import { NextFunction, Router } from 'express';
import BaseController from '../controllers/baseController';
import UserController from '../controllers/user';
import { InjectedRequest, InjectedResponse } from '../interfaces/express';
import Security from '../security/security';

const userRoutes = Router();
const _security = new Security();
const _baseController = new BaseController();
const _controller = new UserController();

// Route that creates a new user.
userRoutes.post(
    '/',
    (req: InjectedRequest, res: InjectedResponse, next: NextFunction) => _controller.createUser(req, res, next),
    (req: InjectedRequest, res: InjectedResponse, next: NextFunction) => _baseController.send(req, res, next),
);

// Route that fetches a user's profile.
userRoutes.get(
    '/profile',
    (req: InjectedRequest, res: InjectedResponse, next: NextFunction) => _security.authenticate(req, res, next),
    (req: InjectedRequest, res: InjectedResponse, next: NextFunction) => _controller.getUserProfile(req, res, next),
    (req: InjectedRequest, res: InjectedResponse, next: NextFunction) => _baseController.send(req, res, next),
);

// Route that logins a user.
userRoutes.post(
    '/login',
    (req: InjectedRequest, res: InjectedResponse, next: NextFunction) => _controller.loginUser(req, res, next),
    (req: InjectedRequest, res: InjectedResponse, next: NextFunction) => _security.generateUserToken(req, res, next),
    (req: InjectedRequest, res: InjectedResponse, next: NextFunction) => _baseController.send(req, res, next),
);

// Route that logins a user.
userRoutes.delete(
    '/logout',
    (req: InjectedRequest, res: InjectedResponse, next: NextFunction) => _security.authenticate(req, res, next),
    (req: InjectedRequest, res: InjectedResponse, next: NextFunction) => _controller.logoutUser(req, res, next),
    (req: InjectedRequest, res: InjectedResponse, next: NextFunction) => _baseController.send(req, res, next),
);

export default userRoutes;
