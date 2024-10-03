import { errorWrapper } from "../utils/errors"


export const createUser = errorWrapper(async (_req, res) => {
    res.status(200).send({ token: 'test, test, test...' });
});

export const authenicateUser = errorWrapper(async () => {
});

