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
  if (error.type) return error;
  const [result] = await productsModel.findProductsById(productId);
  return { type: null, message: result };
};

const insertProduct = async (product) => {
  const result = await validateProducts.validateInsertProducts(product);
  if (result.type) return result;
  return { type: null, message: result.message };
};

const updateProduct = async (name, id) => {
  const result = await validateProducts.validateUpdateProducts(name, id);
  if (result.type) return result;
  await productsModel.updateProduct(name, id);
  return { type: null, message: result.message, status: result.status };
};

module.exports = {
  findAllProducts,
  findProductsById,
  insertProduct,
  updateProduct,
};