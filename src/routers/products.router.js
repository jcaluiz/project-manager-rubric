const express = require('express');
const productsController = require('../controllers/products.controller');

const router = express.Router();

router.get('/', productsController.findAllProducts);

router.get('/:id', productsController.findProductsById);

router.post('/', productsController.insertProduct);

module.exports = router;