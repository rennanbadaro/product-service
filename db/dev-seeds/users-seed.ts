import * as Knex from "knex";

import mockData from './data/users.json';

const tableName = 'users'

export async function seed(knex: Knex): Promise<void> {
    await knex(tableName).del();

    await knex(tableName).insert(mockData);
};
