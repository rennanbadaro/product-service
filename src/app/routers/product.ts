import Router from '@koa/router';

import dependencyContainer from '../../shared/dependency-container/container';
import dependencyEnum from '../../shared/dependency-container/dependency.enum';

const controller = dependencyContainer.get(dependencyEnum.PRODUCT_CONTROLLER);

const router = new Router({
  prefix: '/product',
});

// @ts-ignore
router.get('/', (...args) => controller.fetchProductsWithDiscount(...args));

export default router;
