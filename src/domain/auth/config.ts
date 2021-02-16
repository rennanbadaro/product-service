import { get } from 'env-var';

export default {
  TOKEN_SECRET: get('TOKEN_SECRET').required().asString(),
};
