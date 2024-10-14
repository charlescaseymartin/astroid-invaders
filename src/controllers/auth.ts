import { createEntity } from '../utils/typeorm';
import { Player } from '../database/entities';
import { errorWrapper } from "../utils/errors"


export const createPlayer = errorWrapper(async (req, res) => {
    const player = createEntity(Player, {});
    console.log({ body: req.body, player });
    res.status(200).send({ token: 'test, test, test...' });
});

export const authenicatePlayer = errorWrapper(async () => {
});

