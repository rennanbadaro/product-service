import * as Knex from "knex";

import mockData from './data/products.json';

const tableName = 'products'

export async function seed(knex: Knex): Promise<void> {
    await knex(tableName).del();

    await knex(tableName).insert(mockData);
};
