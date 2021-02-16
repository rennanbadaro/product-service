import Knex from 'knex';
import { camelCase } from 'change-case-object';

import DataProvider from '../storage/DataProvider';
import User from '../../domain/user/User';

interface IUserRepository {
  fetchByEmailAndPassword(email: string, password: string): Promise<User | null>;
}

class UserRepository implements IUserRepository {
  private readonly dbConn: Knex;

  constructor(dbProvider: DataProvider) {
    this.dbConn = dbProvider.getConnection() as Knex;
  }

  async fetchByEmailAndPassword(email: string, password: string) {
    const [result] = await this.dbConn
      .select()
      .from('users')
      .where({ email, password })
      .limit(1);

    if (!result) {
      return null;
    }

    const parsed = camelCase(result as Record<string, any>);

    return new User(parsed as User);
  }
}

export { IUserRepository, UserRepository };
