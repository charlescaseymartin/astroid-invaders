import { createEntity } from '../utils/typeorm';
import { Player } from '../database/entities';
import { errorWrapper } from '../utils/errors';
import { signToken } from '../utils/authToken';


export const createPlayer = errorWrapper(async (_req, res) => {
    const player = await createEntity(Player, { score: 0 });
    const token = signToken({ sub: player.id });
    res.status(200).json({ token });
});
