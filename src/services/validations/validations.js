const productsModel = require('../../models/products.model');

const validateProducts = async () => {
  const products = await productsModel.findAllProducts();
  console.log(products);
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

module.exports = {
  validateProducts,
  validateProductsFindById,
};