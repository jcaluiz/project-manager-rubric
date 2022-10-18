const validateSales = require('./validations/validations');
const salesModel = require('../models/sales.models');

const insertSales = async (sale) => {
  const result = await validateSales.validateInsertSales(sale);
  if (result.message !== '') return result;
  const insert = await salesModel.insertSales(sale);
  return {
    type: null,
    message: '',
    status: 201,
    insert,
  };
};

const findAllSales = async () => {
  const error = await validateSales.validateSales();
  if (error.type) return error;
  const result = await salesModel.findSalesByAll();
  const result2 = await salesModel.findSalesDate();
  let message = [];
  result2.map((r) => result.forEach((re) => {
      if (r.id === re.sale_id) {
        message = [...message, {
          saleId: r.id,
          date: r.date,
          productId: re.product_id,
          quantity: re.quantity,
        }];
      }
    }));
  return { type: null, message };
};

const findSalesById = async (saleId) => {
  const error = await validateSales.validateSalesFindById(saleId);
  console.log(error);
  if (error.type) return error;
  const result = await salesModel.findSalesById(saleId);
  const result2 = await salesModel.findSalesDate();
  let message = [];
  result2.map((r) => result.forEach((re) => {
    if (r.id === re.sale_id) {
      message = [...message, {
        date: r.date,
        productId: re.product_id,
        quantity: re.quantity,
      }];
    }
  }));
  console.log({ type: null, message });
  return { type: null, message };
};

module.exports = {
  insertSales,
  findAllSales,
  findSalesById,
};