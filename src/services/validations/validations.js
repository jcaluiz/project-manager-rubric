const productsModel = require('../../models/products.model');
const schema = require('./schema');
const salesModel = require('../../models/sales.models');

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

const validateSales = async () => {
  const products = await salesModel.findSalesByAll();
  if (!products) {
    return { type: 'SALE_NOT_FOUND', message: 'Sale not found', status: 404 };
  }
  return { type: null, message: '' };
};

const validateSalesFindById = async (saleId) => {
  const [salesById] = await salesModel.findSalesById(saleId);
  if (!salesById || salesById === []) {
    return {
      type: 'SALE_NOT_FOUND',
      message: 'Sale not found',
    };
  }
  return { type: null, message: '' };
};

const validateUpdateProducts = async (name, id) => {
  const [productById] = await salesModel.findSalesById(id);
  const validateName = await schema.validateUpdate(name);
  if (validateName) {
 return {
   type: validateName.message,
   message: validateName.message,
   status: validateName.status,
  }; 
}
  if (!productById || productById === []) {
    return {
      type: 'PRODUCT_NOT_FOUND',
      message: 'Product not found',
      status: 404,
    };
  }
  return { type: null, message: '', status: 200 };
};

module.exports = {
  validateProducts,
  validateProductsFindById,
  validateInsertProducts,
  validateInsertSales,
  validateSales,
  validateSalesFindById,
  validateUpdateProducts,
};