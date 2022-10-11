const validateProducts = require('./validations/validations');
const productsModel = require('../models/products.model');

const findAllProducts = async () => {
  const error = await validateProducts.validateProducts();
  if (error.type) return error;
  const result = await productsModel.findAllProducts();
  return { type: null, message: result };
};

const findProductsById = async (productId) => {
  const error = await validateProducts.validateProductsFindById(productId);
  console.log(error);
  if (error.type) return error;
  const [result] = await productsModel.findProductsById(productId);
  return { type: null, message: result };
};

module.exports = {
  findAllProducts,
  findProductsById,
};