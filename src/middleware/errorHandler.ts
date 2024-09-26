import { ErrorRequestHandler } from 'express';
import { CustomError } from '../utils/errors';

const errorToResponse = (err: any) => ({
    message: err.message || 'Something went wrong.',
    code: err.code || 'INTERNAL_ERROR',
    status: err.status || 500,
    data: err.data || {},
})

export const errorHandler: ErrorRequestHandler = (err, _req, res, _next) => {
    console.error(err);
    const isClientError = err instanceof CustomError;
    const clientError = isClientError ? errorToResponse(err) : errorToResponse(new CustomError());
    return res.status(clientError.status).send(clientError.message);
}
