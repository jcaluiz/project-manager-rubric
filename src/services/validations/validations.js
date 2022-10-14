const productsModel = require('../../models/products.model');
const schema = require('./schema');
// const salesModel = require('../../models/sales.models');

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
  const validate = await schema.validateNameSchema(product.name);
  if (validate) {
    return {
    type: 'NAME_IS_REQUIRED',
    message: validate.message,
    status: validate.status,
    };
  }
  const [result] = await productsModel.insertProduct(product);
  return { type: null, message: result };
};

const validateInsertSales = async (sale) => {
  const result = await schema.validateSalesSchema2(sale);
  if (result.some((r) => r)) {
    return {
      message: result[0].message, status: result[0].status,
    }; 
  }
  return { type: null, message: '' };
};

module.exports = {
  validateProducts,
  validateProductsFindById,
  validateInsertProducts,
  validateInsertSales,
};