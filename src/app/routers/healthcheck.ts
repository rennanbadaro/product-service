import Router from '@koa/router';
import Knex from 'knex';
import { Context } from 'koa';
import container from '../../shared/dependency-container/container';
import DependencyEnum from '../../shared/dependency-container/dependency.enum';

const router = new Router({
  prefix: '/health',
});

router.get('/', async (ctx: Context) => {
  try {
    const dbProvider = container.get(DependencyEnum.POSTGRE_PROVIDER);

    // @ts-ignore
    await dbProvider.getConnection()
      .select(1)
      .from('product');

    ctx.status = 200;
  } catch (err) {
    console.error(err);

    ctx.status = 503;
  }
});

export default router;
