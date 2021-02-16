import Redis from 'ioredis';
import Knex from 'knex';

export default interface DataProvider {
    getConnection(): Knex | Redis.Redis
}
