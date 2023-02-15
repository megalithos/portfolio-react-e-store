const constants = require('../../src/constants');
const TABLE_NAME = constants.PRODUCT_ATTRIBUTES_TABLE_NAME

exports.up = function(knex) {
    return knex.schema.createTable(TABLE_NAME, function(table) {
      table.increments();
      table.integer('product_id').notNullable();
      table.boolean('trending').defaultTo(false);
      table.boolean('most_viewed').defaultTo(false);
      table.boolean('interesting').defaultTo(false);
    });
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTable(TABLE_NAME);
  };