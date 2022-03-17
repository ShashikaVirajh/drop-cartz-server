import { NextFunction, Response, Request } from 'express';

import ErrorResponse from 'library/error-response';

const routeNotFound = (req: Request, res: Response, next: NextFunction): any => {
  const message = `Route not found - ${req.originalUrl}`;
  next(new ErrorResponse(message, 404));
};

export default routeNotFound;
