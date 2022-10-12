const productsService = require('../services/products.service');

const findAllProducts = async (_req, res) => {
  const { type, message } = await productsService.findAllProducts();
  if (type) return res.status(404).json({ message });
  res.status(200).json(message);
};

const findProductsById = async (req, res) => {
  const { id } = req.params;
  const { type, message } = await productsService.findProductsById(id);
  if (type) return res.status(404).json({ message });
  res.status(200).json(message);
};

const insertProduct = async (req, res) => {
  const product = req.body;
  const { message } = await productsService.insertProduct(product);
  res.status(201).json(message);
};

module.exports = {
  findAllProducts,
  findProductsById,
  insertProduct,
};