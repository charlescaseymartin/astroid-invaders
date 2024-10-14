import { Router } from 'express';
import * as auth from './controllers/auth';

export const publicRouter = Router();
export const privateRouter = Router();

publicRouter.get('/auth', auth.createPlayer);

privateRouter.use(() => console.log('authorize user'));
privateRouter.get('/player', () => {});
privateRouter.put('/player', () => {});
