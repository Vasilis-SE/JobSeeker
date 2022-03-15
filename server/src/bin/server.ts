import * as bodyParser from 'body-parser';

import express from 'express';
import cors from 'cors';
import * as http from 'http';
import helmet from 'helmet';
import Routes from '../routes/router';
import passport from 'passport';

export default class Server {
    private _app: express.Application;
    private _routes: Routes;

    public constructor() {
        this._app = express();
        this._routes = new Routes();
        this.config();
    }

    public run(port: number, callback?: () => void): http.Server {
        if (callback) return this._app.listen(port, callback);
        return this._app.listen(port);
    }

    private config(): void {
        this._app.use(bodyParser.json());
        this._app.use(bodyParser.urlencoded({ extended: true }));
        this._app.use(cors());
        this._app.use(helmet());
        this._app.use(passport.initialize());
        this._app.use('/api/v1', this._routes.getAppRoutes());

        this._app.use((req, res) => {
            res.status(404).send({ url: `${req.originalUrl} not found` });
        });
    }
}
