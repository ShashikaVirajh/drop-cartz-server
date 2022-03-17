import { NextFunction, Response, Request } from 'express';

import { messages } from './middleware.strings';
import asyncHandler from './async-handler.middleware';

import { userService } from 'api/user/user.service';
import { TokenManager } from 'library/token-manager.library';
import UserMapper from 'api/user/user.mapper';

const auth = asyncHandler(async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  const { authorization } = req?.headers;

  const token = authorization?.split(' ')[1];

  if (!token || token === 'null') {
    return res.status(401).json({ success: false, message: messages.NO_TOKEN_PROVIDED });
  }

  try {
    const { userId } = TokenManager.verifyToken(token, process.env.JWT_ACCESS_TOKEN_SECRET);
    const user = await userService.getProfile(userId);
    req.authUser = new UserMapper(user);

    next();
  } catch (error) {
    res.status(401).json({ success: false, message: error?.message });
  }
});

export default auth;
