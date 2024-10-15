import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../utils/authToken';
import { Player } from '../database/entities';
import { InvalidTokenError, errorWrapper } from '../utils/errors';


const getAuthTokenFromHeaders = (req: Request): string | null => {
    const header = req.get('Authorization') || '';
    const [bearer, token] = header.split(' ');
    return bearer === 'Bearer' && token ? token : null;
}

export const authenicatePlayer = errorWrapper(async (req: Request, _res: Response, next: NextFunction) => {
    const token = getAuthTokenFromHeaders(req);
    if (!token) throw new InvalidTokenError('Authentication token not found.');
    const playerId = verifyToken(token).sub;
    if (!playerId) throw new InvalidTokenError('Authentication token is invalid.');
    const player = await Player.findOneBy(playerId);
    if (!player) throw new InvalidTokenError('Authentication token is invalid: User not found.');
    req.player = player;
    next();
});

