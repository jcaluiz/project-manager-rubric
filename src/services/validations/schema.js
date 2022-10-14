const Joi = require('joi');
const productModel = require('../../models/products.model');

// const addNameProductSchema = Joi.object({
//   name: Joi.string().min(5),
// });

const validateNameSchema = (name) => {
  if (name === '' || name === undefined) {
    return { message: '"name" is required', status: 400 };
  }
  if (name.length < 5) {
    return { message: '"name" length must be at least 5 characters long', status: 422 };
  }
  return null;
};

const validateSalesSchema = Joi.object({
  productId: Joi.number().integer().required(),
  quantity: Joi.number().integer().min(1).required(),
});

const productId = {
  '': { message: 'Product not found', status: 400 },
  more: { message: 'Product not found', status: 404 },
  [undefined]: { message: '"productId" is required', status: 400 },
};
const quantity = {
  [undefined]: { message: '"quantity" is required', status: 400 },
  '': { message: '"quantity" is required', status: 400 },
  less: { message: '"quantity" must be greater than or equal to 1', status: 422 },
};

const validateSalesSchema2 = async (sale) => {
  const getAll = await productModel.findAllProducts();
  const resultProduct = await sale
    .map((s) => (sale.some((sa) => sa.productId > getAll[getAll.length - 1].id)
      ? productId.more : productId[s.productId]));
  const resultQuality = await sale
    .map((s) => (s.quantity < 1 ? quantity.less : quantity[s.quantity]));
  let result = await resultProduct.filter((objectError) => objectError !== undefined);

  result = !result.some((r) => r)
    ? resultQuality.filter((objectError) => objectError !== undefined) : result;
  return result;
};

module.exports = {
  validateSalesSchema,
  validateNameSchema,
  validateSalesSchema2,
};
