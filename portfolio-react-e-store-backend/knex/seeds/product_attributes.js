const constants = require('../../src/constants');
const TABLE_NAME = constants.PRODUCT_ATTRIBUTES_TABLE_NAME
const PRODUCTS_TABLE_NAME = constants.PRODUCTS_TABLE_NAME
const productModel = require('../../models/product')

// place every product into one of the categories
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex(TABLE_NAME).del()

  let newProductAttributesTable = []

  const allProducts = await productModel.GetAll();

  for (let i = 0; i < allProducts.length; i++) {
    const productId = allProducts[i].id;

    const productAttributeRow = {product_id:productId};

    const randomNumber = Math.floor(Math.random() * 3) ; // random number between 0, 1, 2

    switch(randomNumber)
    {
      case 0:
        productAttributeRow.trending = true;
        break;
      case 1:
        productAttributeRow.interesting = true;
        break;
      case 2:
        productAttributeRow.most_viewed = true;
        break;
    }

    newProductAttributesTable.push(productAttributeRow);
  }

  
  await knex(TABLE_NAME).insert(
    newProductAttributesTable
  );
};