import Knex from 'knex';

import storageConfig from './config';
import DataProvider from './DataProvider';

export default class PostgreProvider implements DataProvider {
  private static instance: PostgreProvider;
  private static connection: Knex;

  static getInstance() {
    if (!PostgreProvider.instance) {
      PostgreProvider.instance = new PostgreProvider();
    }

    return PostgreProvider.instance;
  }

  getConnection() {
    if (!PostgreProvider.connection) {
      PostgreProvider.connection = Knex({
        client: 'pg',
        connection: {
          user: storageConfig.db.user,
          password: storageConfig.db.password,
          host: storageConfig.db.host,
          port: storageConfig.db.port,
          database: storageConfig.db.database,
        },
        acquireConnectionTimeout: 2000,
      });
    }

    return PostgreProvider.connection;
  }
}
