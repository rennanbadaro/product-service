import * as knex from 'knex';

const tableName = 'users';

export async function up(db: knex): Promise<void> {
  return db.schema.createTable(tableName, function (table) {
    table.string('id').primary();
    table.string('first_name').notNullable();
    table.string('last_name').notNullable();
    table.date('date_of_birth').notNullable();
    table.string('email').notNullable().unique();
    table.string('password').notNullable();
  });
}

export async function down(db: knex): Promise<void> {
  return db.schema.dropTable(tableName);
}
