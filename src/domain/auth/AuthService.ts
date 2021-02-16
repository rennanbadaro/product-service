import jwt from 'jsonwebtoken';

import authConfig from './config';

interface IAuthService {
  generateToken(payload: Record<string, any>): string;

  decodeToken(token: string): Record<string, any>;
}

interface ITokenEngine {
  sign(payload: Record<string, any>): string;
  verify(token: string): Record<string, any> | string;
}

class AuthService implements IAuthService {
  constructor(private readonly tokenEngine: typeof jwt = jwt) {}

  generateToken(payload: Record<string, any>) {
    return this.tokenEngine.sign({ ...payload }, authConfig.TOKEN_SECRET);
  }

  decodeToken(token: string) {
    return this.tokenEngine.verify(token, authConfig.TOKEN_SECRET) as Record<string, any>;
  }
}

export { ITokenEngine, IAuthService, AuthService };
