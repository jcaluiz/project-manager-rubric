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

module.exports = {
  insertSales,
};