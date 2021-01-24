import Knex from 'knex';

export default interface DataProvider {
    getConnection(): Knex
}
