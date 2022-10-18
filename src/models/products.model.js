// const camelize = require('camelize');
const snakeize = require('snakeize');
const connection = require('./connection');

const findAllProducts = async () => {
  const [result] = await connection.execute(
    'SELECT * FROM StoreManager.products',
  );
  return result;
};

const findProductsById = async (productId) => {
  const [result] = await connection.execute(
    'SELECT * FROM StoreManager.products WHERE id = ?', [productId],
  );
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

const updateProduct = async (name, id) => connection.execute(
    `UPDATE StoreManager.products SET name = '${name}' WHERE id = ${id}`,
);
  
const deleteProduct = async (id) => connection.execute(
  'DELETE FROM StoreManager.products WHERE id = ?', [id],
);

module.exports = {
  findAllProducts,
  findProductsById,
  insertProduct,
  updateProduct,
  deleteProduct,
};