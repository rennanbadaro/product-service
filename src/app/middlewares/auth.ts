import { Context, Next } from 'koa';

import { AuthService } from '../../domain/auth/AuthService';
import RedisProvider from '../../infrastructure/storage/RedisProvider';

import dependencyContainer from '../../shared/dependency-container/container';
import dependencyEnum from '../../shared/dependency-container/dependency.enum';

const authService = dependencyContainer.get(
  dependencyEnum.AUTH_SERVICE
) as AuthService;

const redisProvider = dependencyContainer.get(
  dependencyEnum.REDIS_PROVIDER
) as RedisProvider;

const authMiddleware = () => async (ctx: Context, next: Next) => {
  if (!ctx.request.headers.authorization) {
    ctx.response.status = 401;

    return;
  }

  const bearer = ctx.request.headers.authorization;
  const token = bearer && bearer.replace('Bearer ', '');

  try {
    const hasValidToken = await redisProvider.getConnection().get(token);

    if (!hasValidToken) {
      ctx.response.status = 401;

      return;
    }

    const decoded = authService.decodeToken(token);

    if (!decoded.id) {
      ctx.response.status = 401;

      return;
    }

    ctx.user = decoded;
  } catch (err) {
    console.error(err);

    ctx.response.status = 401;

    return;
  }

  return next();
};

export default authMiddleware;
