import { RequestHandler } from 'express';
import { createEntity } from '../utils/typeorm';
import { Player } from '../database/entities';
import { signToken } from '../utils/authToken';


export const authorizePlayer: RequestHandler = async (_req, res, next) => {
    try {
        const player = await createEntity(Player, { score: 0 });
        const token = signToken({ sub: player.id });
        res.status(200).json({ token });
    } catch (err) {
        next(err);
    }
};
