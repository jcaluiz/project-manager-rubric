const salesService = require('../services/sales.service');

const insertSales = async (req, res) => {
  const sale = req.body;
  const result = await salesService.insertSales(sale);

  if (result.status !== 201) return res.status(result.status).json({ message: result.message });
  if (!result.type) {
    return res.status(201).json(result.insert);
  }
};

module.exports = {
  insertSales,
};