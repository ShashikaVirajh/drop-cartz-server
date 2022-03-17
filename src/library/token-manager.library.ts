import jwt from 'jsonwebtoken';

import { JWTSignInIOptions } from 'types';

export class TokenManager {
  static generateToken = (payload: any, secret: string, options: JWTSignInIOptions): string => {
    return jwt.sign(payload, secret, options);
  };

  static verifyToken = (token: string, secret: string): any => {
    return jwt.verify(token, secret);
  };
}
