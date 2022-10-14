const express = require('express');
const salesController = require('../controllers/sales.controller');

const router = express.Router();

router.post('/', salesController.insertSales);

router.get('/', salesController.findAllSales);

router.get('/:id', salesController.findSalesById);

module.exports = router;