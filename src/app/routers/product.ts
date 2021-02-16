import Router from '@koa/router';

import dependencyContainer from '../../shared/dependency-container/container';
import dependencyEnum from '../../shared/dependency-container/dependency.enum';
import ProductController from '../controllers/ProductController';
import authMiddleware from '../middlewares/auth';

const controller = dependencyContainer.get(
  dependencyEnum.PRODUCT_CONTROLLER
) as ProductController;

const router = new Router({
  prefix: '/product',
});

router.get('/', authMiddleware(), (...args) =>
  controller.fetchProductsWithDiscount(...args)
);

export default router;
