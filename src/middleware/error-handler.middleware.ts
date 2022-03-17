import { NextFunction, Response, Request } from 'express';

import ErrorResponse from 'library/error-response';
import { messages } from 'constants/messages.constants';

const errorHandler = (err: ErrorResponse, req: Request, res: Response, next: NextFunction): any => {
  let error = { ...err };
  error.message = err.message;

  /** Mongoose bad ObjectId */
  if (err.name === 'CastError') {
    error = new ErrorResponse(messages.RESOURCE_NOT_FOUND, 400);
  }

  /** Mongoose duplicate key */
  if (err.code === 11000) {
    error = new ErrorResponse(err.message || messages.DUPLICATE_FIELD_VALUE, 400);
  }

  const status = error.status || 500;
  const message = error.message || messages.SERVER_ERROR;

  const response = { success: false, message };

  res.status(status).json(response);
  next();
};

export default errorHandler;
