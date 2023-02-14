const constants = require("../src/constants")
const TABLE_NAME = constants.USERS_TABLE_NAME;
const knex = require('../knex/knex')

const findOne = async (opts) => {
  const { id, email } = opts;

  let query = knex(TABLE_NAME).select("*");

  if (Number.isInteger(id)) {
    query = query.where("id", id);
  } else if (typeof email === "string") {
    query = query.where("email", email);
  } else {
    return Promise.resolve(null);
  }
  
  return query.then(([row]) => row || null);
};

const create = async (newClient) =>
{
    return knex(TABLE_NAME).insert(newClient)
}

module.exports = {
  findOne, create,
};