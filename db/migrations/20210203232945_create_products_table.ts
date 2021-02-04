import * as Knex from 'knex';

const tableName = 'products';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable(tableName, function (table) {
    table.string('id').primary();
    table.string('title').notNullable();
    table.string('description', 500).notNullable();
    table.integer('price_in_cents').notNullable();
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable(tableName);
}
