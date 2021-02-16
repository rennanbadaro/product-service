import Redis from 'ioredis';

import storageConfig from './config';
import DataProvider from './DataProvider';

export default class RedisProvider implements DataProvider {
  private static instance: RedisProvider;
  private static connection: Redis.Redis;
  public static defaultTtl: number = storageConfig.cache.defaultTtl;

  static getInstance() {
    if (!RedisProvider.instance) {
      RedisProvider.instance = new RedisProvider();
    }

    return RedisProvider.instance;
  }

  getConnection() {
    if (!RedisProvider.connection) {
      RedisProvider.connection = new Redis(storageConfig.cache);
    }

    return RedisProvider.connection;
  }
}
