import { Router } from 'express';
import userRoutes from './user';
import companyRoutes from './company';
import jobRoutes from './job';
import * as swaggerUi from 'swagger-ui-express';
import documentation from '../../docs/openapi/documentation';

/**
 * Main router class that 'merges' all the separate routes into a single
 * entity that express will use.
 */
export default class Routes {
    private _routes: Router;

    constructor() {
        this._routes = Router();
        this.initialize();
    }

    private initialize(): void {
        // Load all seperate routes
        this._routes.use('/user', userRoutes);
        this._routes.use('/company', companyRoutes);
        this._routes.use('/job', jobRoutes);

        // Load swagger UI with the api documentation
        this._routes.use('/documentation', swaggerUi.serve);
        this._routes.get('/documentation', swaggerUi.setup(documentation));
    }

    public getAppRoutes(): Router {
        return this._routes;
    }
}
