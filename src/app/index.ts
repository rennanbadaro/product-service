import env from 'env-var';
import Koa from 'koa';

import product from './routers/product';
import healthcheck from './routers/healthcheck';

const app = new Koa();

app.use(healthcheck.routes())
app.use(product.routes());

const PORT = env.get('PORT').required().asInt();

app.listen(PORT);
