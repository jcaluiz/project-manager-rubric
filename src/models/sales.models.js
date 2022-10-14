// const snakeize = require('snakeize');
const connection = require('./connection');

const findSalesByAll = async () => {
  const [result] = await connection.execute(
    'SELECT * FROM StoreManager.sales_products',
  );
  return result;
};

const findSalesDate = async () => {
  const [result] = await connection.execute(
    'SELECT * FROM StoreManager.sales',
  );
  return result;
};

const findSalesById = async (id) => {
  const [result] = await connection.execute(
    'SELECT * FROM StoreManager.sales_products WHERE sale_id = ?', [id],
  );
  return result;
};

const insertSales = async (sale) => {
  // await connection.execute('SET @@global.time_zone = "+3:00"');
  const [result] = await connection.execute(
    'INSERT INTO StoreManager.sales (date) VALUE (NOW())',
  );
  await Promise.all(sale.map(async (key) => {
    await connection.execute(
      `INSERT INTO StoreManager.sales_products (sale_id, product_id, quantity) 
      VALUES (?, ?, ?)`,
      [result.insertId, key.productId, key.quantity],
    );
  }));
  return { id: result.insertId, itemsSold: sale };
};

module.exports = {
  insertSales,
  findSalesByAll,
  findSalesById,
  findSalesDate,
};