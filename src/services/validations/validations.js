const productsModel = require('../../models/products.model');
const schema = require('./schema');

const validateProducts = async () => {
  const products = await productsModel.findAllProducts();
  if (!products) {
    return { type: 'PRODUCTS_NOT_FOUND', message: 'products not found' };
  }
  return { type: null, message: '' };
};

const validateProductsFindById = async (productId) => {
  const [productsById] = await productsModel.findProductsById(productId);
  if (!productsById || productsById === []) {
    return {
      type: 'PRODUCT_NOT_FOUND',
      message: 'Product not found',
    };
  }
  return { type: null, message: '' };
};

const validateInsertProducts = async (product) => {
  const test = await schema.validateNameSchema(product.name);
  if (test) return { type: 'NAME_IS_REQUIRED', message: test.message, status: test.status };
  const [result] = await productsModel.insertProduct(product);
  return { type: null, message: result };
};

module.exports = {
  validateProducts,
  validateProductsFindById,
  validateInsertProducts,
};