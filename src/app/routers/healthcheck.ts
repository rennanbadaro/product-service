import Router from '@koa/router';
import { Context } from 'koa';
import PostgreProvider from '../../infrastructure/storage/PostgreProvider';
import RedisProvider from '../../infrastructure/storage/RedisProvider';
import container from '../dependency-container/container';
import DependencyEnum from '../dependency-container/dependency.enum';

const router = new Router({
  prefix: '/health',
});

router.get('/', async (ctx: Context) => {
  const dbProvider = container.get(DependencyEnum.POSTGRE_PROVIDER) as PostgreProvider;
  const cacheProvider = container.get(DependencyEnum.REDIS_PROVIDER) as RedisProvider;

  const cacheConnected = cacheProvider.getConnection().status === 'ready';

  const dbConnected = Boolean(
    await dbProvider
      .getConnection()
      .select(1)
      .from('products')
      .catch(err => console.error(err))
  );

  ctx.body = { cacheConnected, dbConnected };
  ctx.status = cacheConnected && dbConnected ? 200 : 503;
});

export default router;
