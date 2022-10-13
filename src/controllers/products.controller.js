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
  const { type, message, status } = await productsService.insertProduct(product);
  if (type) return res.status(status).json({ message });
  res.status(201).json(message);
};

module.exports = {
  findAllProducts,
  findProductsById,
  insertProduct,
};