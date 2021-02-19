import Router from '@koa/router';

import dependencyContainer from '../dependency-container/container';
import dependencyEnum from '../dependency-container/dependency.enum';
import UserController from '../controllers/UserController';

const controller = dependencyContainer.get(dependencyEnum.USER_CONTROLLER) as UserController;

const router = new Router({
  prefix: '/user',
});

router.post('/login', (...args) => controller.login(...args));

export default router;
