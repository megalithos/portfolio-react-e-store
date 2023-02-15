const constants = require('../../src/constants');
const TABLE_NAME = constants.MESSAGES_TABLE_NAME

exports.up = function(knex) {
    return knex.schema.createTable(TABLE_NAME, function(table) {
      table.increments();
      table.string('name');
      table.string('email')
      table.string('phone_number');
      table.string('message');
      table.boolean('read').defaultTo(false);
      table.timestamp('created_at').defaultTo(knex.fn.now());
      table.timestamp('updated_at').defaultTo(knex.fn.now());
    });
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTable(TABLE_NAME);
  };