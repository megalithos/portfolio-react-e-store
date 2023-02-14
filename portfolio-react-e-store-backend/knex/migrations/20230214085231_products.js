const constants = require('../../src/constants');
const TABLE_NAME = constants.PRODUCTS_TABLE_NAME

exports.up = function(knex) {
    return knex.schema.createTable(TABLE_NAME, function(table) {
      table.increments();
      table.string('title');
      table.float('price')
      table.string('product_details');
      table.string('image_path')
      table.timestamp('created_at').defaultTo(knex.fn.now());
      table.timestamp('updated_at').defaultTo(knex.fn.now());
    });
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTable(TABLE_NAME);
  };