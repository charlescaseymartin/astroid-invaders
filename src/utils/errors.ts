import { RequestHandler } from "express";

type ErrorData = { [key: string]: any };

export class CustomError extends Error {
  constructor(
    public message: string = 'Something went wrong, please contact our support.',
    public code: string | number = 'INTERNAL_ERROR',
    public status: number = 500,
    public data: ErrorData = {},
  ) {
    super();
  }
}

export class RouteNotFoundError extends CustomError {
  constructor(originalUrl: string) {
    super(`Route '${originalUrl}' does not exist.`, 'ROUTE_NOT_FOUND', 404);
  }
}

export class EntityNotFoundError extends CustomError {
  constructor(entityName: string) {
    super(`${entityName} not found.`, 'ENTITY_NOT_FOUND', 404);
  }
}

export class BadUserInputError extends CustomError {
  constructor(errorData: ErrorData) {
    super('There were validation errors.', 'BAD_USER_INPUT', 400, errorData);
  }
}

export class InvalidTokenError extends CustomError {
  constructor(message = 'Authentication token is invalid.') {
    super(message, 'INVALID_TOKEN', 401);
  }
}

export const errorWrapper = (requestHandler: RequestHandler): RequestHandler => {
    const wrapper: RequestHandler = async (req, res, next) => {
        try {
            return await requestHandler(req, res, next);
        } catch (err) {
            next(err);
        }
    };
    return wrapper;
}
