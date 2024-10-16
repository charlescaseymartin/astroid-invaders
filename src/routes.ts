import { Router } from 'express';
import * as auth from './controllers/auth';
import { authenicatePlayer } from './middleware/playerAuth';

const rootRouter = Router({ mergeParams: true });
const publicRouter = Router({ mergeParams: true });
const privateRouter = Router({ mergeParams: true });

rootRouter.use('/api', publicRouter);
rootRouter.use('/api', privateRouter);

publicRouter.get('/login', auth.createPlayer);

privateRouter.use(authenicatePlayer);
privateRouter.get('/player', () => { });
privateRouter.put('/player', () => { });

export default rootRouter;
