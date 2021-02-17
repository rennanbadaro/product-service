// @ts-ignore
import bodyParser from 'koa-bodyparser';
import env from 'env-var';
import Koa from 'koa';

import product from './routers/product';
import user from './routers/user';
import healthcheck from './routers/healthcheck';

import requestLogger from './middlewares/request-logger';

const app = new Koa();

app.use(requestLogger())
app.use(bodyParser());
app.use(healthcheck.routes())
app.use(product.routes());
app.use(user.routes());

const PORT = env.get('PORT').required().asInt();

app.listen(PORT);
