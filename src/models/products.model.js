// const camelize = require('camelize');
const snakeize = require('snakeize');
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

const insertProduct = async (product) => {
  const columns = Object.keys(snakeize(product))
    .map((key) => `${key}`).join(', ');
  
  const placeholders = Object.keys(product)
    .map((_key) => '?').join(', ');
  
  const [{ insertId }] = await connection.execute(
    `INSERT INTO StoreManager.products (${columns})  VALUE (${placeholders});`,
    [...Object.values(product)],
  );
  const result = findProductsById(insertId);

  return result;
};

module.exports = {
  findAllProducts,
  findProductsById,
  insertProduct,
};