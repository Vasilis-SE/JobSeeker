import { Router } from 'express';
import userRoutes from './user';

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
    }

    public getAppRoutes(): Router {
        return this._routes;
    }
}
