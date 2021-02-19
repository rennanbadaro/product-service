import { Redis } from 'ioredis';

import User from '../../domain/user/User';
import DataProvider from '../storage/DataProvider';
import { IUserRepository } from '../repositories/UserRepository';
import RedisProvider from '../storage/RedisProvider';

interface UserOutPort {
  setValidToken(token: string): Promise<void>;
  fetchByEmailAndPassword(
    email: string,
    password: string
  ): Promise<User | null>;
}

class UserAdapter implements UserOutPort {
  private readonly repository: IUserRepository;
  private readonly cacheConn: Redis;
  constructor(repository: IUserRepository, cacheProvider: DataProvider) {
    this.repository = repository;
    this.cacheConn = cacheProvider.getConnection() as Redis;
  }

  fetchByEmailAndPassword(email: string, password: string) {
    return this.repository.fetchByEmailAndPassword(email, password);
  }

  async setValidToken(token: string) {
    await this.cacheConn.set(token, 'ok', 'EX', RedisProvider.defaultTtl);
  }
}

export { UserOutPort, UserAdapter };
