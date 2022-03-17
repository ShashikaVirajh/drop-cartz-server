import { Handler, NextFunction, Response, Request } from 'express';

const asyncHandler = (handler: Handler): Handler => async (req: Request, res: Response, next: NextFunction) => {
  try {
    await handler(req, res, next);
  } catch (ex) {
    next(ex);
  }
};

export default asyncHandler;
