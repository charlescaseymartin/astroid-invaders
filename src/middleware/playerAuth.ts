import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../utils/authToken';
import { Player } from '../database/entities';
import { InvalidTokenError } from '../utils/errors';


interface QueryRequest extends Request {
    _query: Record<string, string>;
    player: Player;
}

const getAuthTokenFromHeaders = (req: Request): string | null => {
    const header = req.get('Authorization') || '';
    const [bearer, token] = header.split(' ');
    return bearer === 'Bearer' && token ? token : null;
}

export const authenicatePlayer = async (req: QueryRequest, _res: Response, next: NextFunction) => {
    try {
        if (req._query.sid === undefined) return next();
        const token = getAuthTokenFromHeaders(req);
        if (!token) throw new InvalidTokenError('Authentication token not found.');
        const playerId = verifyToken(token).sub;
        if (!playerId) throw new InvalidTokenError('Authentication token is invalid.');
        const player = await Player.findOneBy(playerId);
        if (!player) throw new InvalidTokenError('Authentication token is invalid: Player not found.');
        req.player = player;
        next();
    } catch (err) {
        next(err);
    }
};

