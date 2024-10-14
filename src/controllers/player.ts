import { Player } from '@entities/index';
import { createEntity } from '../utils/typeorm';
import { errorWrapper } from '../utils/errors';


export const create = errorWrapper(async (req, res) => {
    const player = await createEntity(Player, {});
    console.log({ player });
})
