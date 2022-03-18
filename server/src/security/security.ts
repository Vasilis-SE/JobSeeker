import passport from 'passport';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import { sign, decode, JwtPayload } from 'jsonwebtoken';
import { InjectedRequest, InjectedResponse } from '../interfaces/express';
import { NextFunction } from 'express';
import { IFailedResponse, ISuccessfulResponse, ISuccessfulResponseData } from '../interfaces/response';
import { InvalidTokenProvided } from '../exceptions/security';
import ObjectHandler from '../helpers/objectHandler';
import UserModel from '../models/user';
import { CouldNotFindResource } from '../exceptions/resource';

// Load enviromentals
require('../bin/env');

export default class Security {
    constructor() {
        this.initializeJWTStrategy();
    }

    initializeJWTStrategy() {
        const options = {
            jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('jwt'),
            secretOrKey: process.env.JWT_TOP_SECRET,
            ignoreExpiration: false,
        };

        passport.use(
            new JwtStrategy(options, async (jwtPayload: JwtPayload, done: any) => {
                try {
                    const userid = jwtPayload.id;

                    // Get credentials of user to attach to request. That way the app
                    // can use the data whenever it wants (logging movements).
                    const _model = new UserModel({ id: userid });
                    const user = await _model.getUsers({ fields: ['id', 'username', 'created_at'] });
                    if (!user) throw new CouldNotFindResource();

                    done(null, user[0]);
                } catch (err) {
                    done(err);
                }
            }),
        );
    }

    authenticate(req: InjectedRequest, res: InjectedResponse, next: NextFunction) {
        return passport.authenticate('jwt', { session: false }, async (err, user, info) => {
            try {
                if (err || !user) throw new InvalidTokenProvided();

                const authorizationHeader: string = req.headers.authorization;
                if (!authorizationHeader) throw new InvalidTokenProvided();

                const token: string = authorizationHeader.replace('JWT', '').trim();

                const _model = new UserModel({ id: user.id });
                const cachedToken = await _model.getUserToken();
                if (!cachedToken || cachedToken !== token) throw new InvalidTokenProvided();

                req.user = user;
                next();
            } catch (e) {
                if (!(e instanceof InvalidTokenProvided)) throw e;

                const errorResource: any = { status: false, ...ObjectHandler.getResource(e) };
                const error: IFailedResponse = errorResource;
                res.status(e.httpCode).json(error);
            }
        })(req, res, next);
    }

    async generateUserToken(req: InjectedRequest, res: InjectedResponse, next: NextFunction) {
        try {
            if (!('response' in res) || !res.response.status) 
                throw new Error();

            const content: ISuccessfulResponse = res.response;
            const contentData: ISuccessfulResponseData = content.data;
            if (!('id' in contentData) || !contentData.id) throw Error();

            const rememberMeFlag = 'rm' in req.query && req.query.rm === 'true' ? true : false;

            let token = '';
            if (rememberMeFlag) {
                token = sign(contentData, process.env.JWT_TOP_SECRET, { expiresIn: 604800 }); // A week
            } else {
                token = sign(contentData, process.env.JWT_TOP_SECRET, { expiresIn: 10800 }); // 3 hour
            }

            const payload = decode(token) as JwtPayload;

            // Log new token to redis
            const _model = new UserModel({ id: contentData.id });
            await _model.setNewUserToken(token);

            content.data = { token, exp: payload.exp };
            res.response = content;

            const seconds: number = payload.exp - Math.round(Date.now() / 1000);
            await _model.setExpirationToToken(seconds);
    
            next();
        } catch (e) {
            next();
        }
    }
}
