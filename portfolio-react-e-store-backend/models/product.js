const constants = require("../src/constants")
const TABLE_NAME = constants.PRODUCTS_TABLE_NAME;
const PRODUCT_ATTRIBUTES_TABLE_NAME = constants.PRODUCT_ATTRIBUTES_TABLE_NAME;
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

const create = async (newProduct) => {
    return knex(TABLE_NAME).insert(newProduct);
}

const deleteByIdIfExists = async (id) => {
  return knex(TABLE_NAME).where('id', id).del();
}

const GetAll = async () => {
  return knex(TABLE_NAME).select('*');
}

const GetAllByAttribute = async (productAttribute) => {
  const products = await knex(TABLE_NAME)
    .join(PRODUCT_ATTRIBUTES_TABLE_NAME, `${TABLE_NAME}.id`, `${PRODUCT_ATTRIBUTES_TABLE_NAME}.product_id`)
    .where(`${PRODUCT_ATTRIBUTES_TABLE_NAME}.${productAttribute}`, true)
    .select(`${TABLE_NAME}.*`);

  return products;
}

const GetAllWithKeyword = async (keyword) => {
  return await knex(TABLE_NAME).where('title', 'ilike', `%${keyword}%`); // ilike for ignore case
}

module.exports = {
  findOne, create, GetAll, deleteByIdIfExists, GetAllByAttribute,
  GetAllWithKeyword
};