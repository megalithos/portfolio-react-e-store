const constants = require('../../src/constants');
const TABLE_NAME = constants.USERS_TABLE_NAME

exports.up = function(knex) {
    return knex.schema.createTable(TABLE_NAME, function(table) {
      table.increments();
      table.string('email');
      table.string('first_name');
      table.string('last_name');
      table.string('password_hash').notNullable();
      table.integer('auth_level').notNullable().defaultTo(0);
      table.boolean('is_active').notNullable().defaultTo(true);
      table.timestamp('created_at').defaultTo(knex.fn.now());
      table.timestamp('updated_at').defaultTo(knex.fn.now());
    });
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTable(TABLE_NAME);
  };