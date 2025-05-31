import { RequestHandler } from 'express';
import { createEntity } from '../utils/typeorm';
import { Player } from '../database/entities';
import { signToken } from '../utils/authToken';
import { InvalidAuthModeError } from '../utils/errors';

export const authorizePlayer: RequestHandler = async (req, res, next) => {
    const mode = req.query.mode || undefined;
    console.log({ mode })
    if (!mode) next(new InvalidAuthModeError());

    try {
        const player = await createEntity(Player, { score: 0, mode: mode as string });
        const token = signToken({ id: player.id });
        res.status(200).json({ token });
    } catch (err) {
        next(err);
    }
};
