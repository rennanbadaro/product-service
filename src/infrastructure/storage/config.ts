import env from 'env-var';

export default {
  db: {
    user: env.get('DB_USERNAME').required().asString(),
    password: env.get('DB_PASSWORD').required().asString(),
    host: env.get('DB_HOST').required().asString(),
    port: env.get('DB_PORT').required().asInt(),
    database: env.get('DB_NAME').required().asString(),
  },
  cache: {
    port: env.get('REDIS_PORT').required().asInt(),
    host: env.get('REDIS_HOST').required().asString(),
    db: env.get('REDIS_DB').required().asInt(),
    defaultTtl: env.get('REDIS_DEFAULT_TTL').required().asInt(),
  },
};
