import env from 'env-var';

export default {
  connection: {
    user: env.get('DB_USERNAME').required().asString(),
    password: env.get('DB_PASSWORD').required().asString(),
    host: env.get('DB_HOST').required().asString(),
    port: env.get('DB_PORT').required().asInt(),
    database: env.get('DB_NAME').required().asString(),
  },
};
