import { ILogIncomingRequestProperties } from '../interfaces/log';
import LogModel from '../models/log';

export default class LogService {
    async logIncomingRequests(log: ILogIncomingRequestProperties): Promise<boolean> {
        try {
            const _model = new LogModel();
            _model.setCreatedAt(Math.floor(Date.now() / 1000));
            _model.setData(log);

            _model.logIncomingRequests();
            return true;
        } catch (error) {
            return false;
        }
    }
}
