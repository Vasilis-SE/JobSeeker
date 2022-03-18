import { NextFunction, Router } from 'express';
import BaseController from '../controllers/baseController';
import JobController from '../controllers/job';
import { InjectedRequest, InjectedResponse } from '../interfaces/express';
import Security from '../security/security';

const jobRoutes = Router();
const _security = new Security();
const _baseController = new BaseController();
const _controller = new JobController();

/**
 * Route that handles the creation of a job.
 * @access /api/v1/job
 */
jobRoutes.post(
    '/',
    (req: InjectedRequest, res: InjectedResponse, next: NextFunction) => _security.authenticate(req, res, next),
    (req: InjectedRequest, res: InjectedResponse, next: NextFunction) => _controller.createJob(req, res, next),
    (req: InjectedRequest, res: InjectedResponse, next: NextFunction) => _baseController.send(req, res, next),
);

/**
 * Route that handles the update of a job.
 * @access /api/v1/job/1
 */
jobRoutes.patch(
    '/:id([0-9]+)',
    (req: InjectedRequest, res: InjectedResponse, next: NextFunction) => _security.authenticate(req, res, next),
    (req: InjectedRequest, res: InjectedResponse, next: NextFunction) => _controller.updateJob(req, res, next),
    (req: InjectedRequest, res: InjectedResponse, next: NextFunction) => _baseController.send(req, res, next),
);

/**
 * Route that handles the deletion of a job.
 * @access /api/v1/job
 */
jobRoutes.delete(
    '/:id([0-9]+)',
    (req: InjectedRequest, res: InjectedResponse, next: NextFunction) => _security.authenticate(req, res, next),
    (req: InjectedRequest, res: InjectedResponse, next: NextFunction) => _controller.deleteJob(req, res, next),
    (req: InjectedRequest, res: InjectedResponse, next: NextFunction) => _baseController.send(req, res, next),
);

export default jobRoutes;