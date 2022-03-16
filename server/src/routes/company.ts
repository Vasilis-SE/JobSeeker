import { NextFunction, Router } from 'express';
import BaseController from '../controllers/baseController';
import CompanyController from '../controllers/company';
import { InjectedRequest, InjectedResponse } from '../interfaces/express';
import Security from '../security/security';

const companyRoutes = Router();
const _security = new Security();
const _baseController = new BaseController();
const _controller = new CompanyController();

companyRoutes.post(
    '/',
    (req: InjectedRequest, res: InjectedResponse, next: NextFunction) => _security.authenticate(req, res, next),
    (req: InjectedRequest, res: InjectedResponse, next: NextFunction) => _controller.createCompany(req, res, next),
    (req: InjectedRequest, res: InjectedResponse, next: NextFunction) => _baseController.send(req, res, next),
);

companyRoutes.patch(
    '/',
    (req: InjectedRequest, res: InjectedResponse, next: NextFunction) => _security.authenticate(req, res, next),
    (req: InjectedRequest, res: InjectedResponse, next: NextFunction) => _controller.updateCompany(req, res, next),
    (req: InjectedRequest, res: InjectedResponse, next: NextFunction) => _baseController.send(req, res, next),
);

companyRoutes.delete(
    '/:id',
    (req: InjectedRequest, res: InjectedResponse, next: NextFunction) => _security.authenticate(req, res, next),
    (req: InjectedRequest, res: InjectedResponse, next: NextFunction) => _controller.deleteCompany(req, res, next),
    (req: InjectedRequest, res: InjectedResponse, next: NextFunction) => _baseController.send(req, res, next),
);

export default companyRoutes;
