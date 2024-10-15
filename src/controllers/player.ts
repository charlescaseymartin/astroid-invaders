import { Player } from '@entities/index';
import { updateEntity } from '../utils/typeorm';
import { errorWrapper } from '../utils/errors';


export const update = errorWrapper(async (req, res) => {
    const player = await updateEntity(Player, req.player.id, req.body);
    console.log({ player, reqPlayer: req.player });
    res.status(200).send('test');
})
