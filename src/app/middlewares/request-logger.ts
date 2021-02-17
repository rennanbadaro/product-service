import logger from 'koa-pino-logger';

const isDevEnv = process.env.NODE_ENV !== 'production';
const logLevel ='debug';

export default function () {
  return logger({
    prettyPrint: isDevEnv,
    level: logLevel,
  });
}
