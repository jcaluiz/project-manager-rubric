// const camelize = require('camelize');
// const snakeize = require('snakeize');
const connection = require('./connection');

const findAllProducts = async () => {
  const [result] = await connection.execute(
    'SELECT * FROM StoreManager.products',
  );
  console.log(result);
  return result;
};

const findProductsById = async (productId) => {
  const [result] = await connection.execute(
    'SELECT * FROM StoreManager.products WHERE id = ?', [productId],
  );
  console.log(result);
  return result;
};

module.exports = {
  findAllProducts,
  findProductsById,
};