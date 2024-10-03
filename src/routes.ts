import { Router } from 'express';

export const publicRouter = Router();
export const privateRouter = Router();

publicRouter.post('/player', () => {});

privateRouter.use(() => console.log('authorize user'));
privateRouter.get('/player', () => {});
privateRouter.put('/player', () => {});
