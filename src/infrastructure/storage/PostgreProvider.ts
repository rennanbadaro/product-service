import Knex from 'knex';

import dbConfig from './config';
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
          user: dbConfig.connection.user,
          password: dbConfig.connection.password,
          host: dbConfig.connection.host,
          port: dbConfig.connection.port,
          database: dbConfig.connection.database,
        },
        acquireConnectionTimeout: 2000,
      });
    }

    return PostgreProvider.connection;
  }
}
