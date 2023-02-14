const constants = require("../src/constants")
const TABLE_NAME = constants.PRODUCTS_TABLE_NAME;
const knex = require('../knex/knex')

const findOne = async (opts) => {
  const { id, title } = opts;
  
  let query = knex(TABLE_NAME).select("*");

  if (Number.isInteger(id)) {
    query = query.where("id", id);
  } else if (typeof title === "string") {
    query = query.where("title", title);
  } else {
    return Promise.resolve(null);
  }
  
  return query.then(([row]) => row || null);
};

const create = async (newProduct) =>
{
    return knex(TABLE_NAME).insert(newProduct)
}

module.exports = {
  findOne, create,
};