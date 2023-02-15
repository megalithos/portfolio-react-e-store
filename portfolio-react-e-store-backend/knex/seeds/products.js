const faker = require('faker'); // for populating with random data
const constants = require('../../src/constants');
const TABLE_NAME = constants.PRODUCTS_TABLE_NAME
const axios = require('axios');
require('dotenv').config() // use .env

exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex(TABLE_NAME).del()

  // fill with random data
  let products = [];
  const maxProductsToGenerate = 100;

  for (let i = 0; i < maxProductsToGenerate; i++)
  {
    let newProduct = {title:faker.commerce.product(), price:faker.commerce.price()};
    
    // 
    const response = await axios.get(
      `https://pixabay.com/api/?key=${process.env.PIXABAY_API_KEY}&q=${newProduct.title}&per_page=10`
    );
    const images = response.data.hits;
  
    if (images.length > 0) {
      const randomImage = images[Math.floor(Math.random() * images.length)];
      newProduct.image_url = randomImage.webformatURL;
    }

    const maxDetailsToGenerate = Math.floor(Math.random() * 4) + 1; // random number between 1 and 5
    let productDetails = '';
    for (let j = 0; j < maxDetailsToGenerate; j++) {
      productDetails += faker.commerce.productAdjective();

      if (j < maxDetailsToGenerate - 1) // dont add newlines on last
        productDetails += "\n\n";
    }

    newProduct.product_details = productDetails

    products.push(newProduct);
  }
  
  await knex(TABLE_NAME).insert(products);
};
