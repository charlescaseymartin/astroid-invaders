import { Router } from 'express';
import * as auth from './controllers/auth';
import { authenicatePlayer } from './middleware/playerAuth';

export const publicRouter = Router({ mergeParams: true });
export const privateRouter = Router({ mergeParams: true });

publicRouter.get('/login', auth.createPlayer);

privateRouter.use(authenicatePlayer);
privateRouter.get('/player', () => { });
privateRouter.put('/player', () => { });
