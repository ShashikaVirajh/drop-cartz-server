import { NextFunction, Response, Request } from 'express';

import asyncHandler from './async-handler.middleware';
import { messages } from './middleware.strings';

import { TokenManager } from 'library/token-manager.library';
import { userService } from 'api/user/user.service';
import { UserRoles } from 'enums';

const admin = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const { authorization } = req?.headers;

  const token = authorization?.split(' ')[1];

  if (!token || token === 'null') {
    return res.status(401).json({ success: false, message: messages.NO_TOKEN_PROVIDED });
  }

  try {
    const { userId } = TokenManager.verifyToken(token, process.env.JWT_ACCESS_TOKEN_SECRET);
    const authUser = await userService.getProfile(userId);

    if (authUser?.role !== UserRoles.Admin) {
      return res.status(403).json({ success: false, message: messages.ADMIN_AUTHORIZATION_FAILED });
    }

    req.authUser = authUser;
    next();
  } catch (error) {
    res.status(401).json({ success: false, message: error?.message });
  }
});

export default admin;
