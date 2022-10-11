const { expect } = require('chai');
const sinon = require('sinon');
const productsModel = require('../../../src/models/products.model');
const productsService = require('../../../src/services/products.service');
const validateProducts = require('../../../src/services/validations/validations');

describe('Verificando o Service de produtos', () => {
  describe('Verificando casos de retorno undefined', () => {
    it('Recebe mensagem de erro caso não tenha nenhum produto cadastrado', async () => {
      // Arranjo
      sinon.stub(productsModel, 'findAllProducts').resolves(undefined);

      // Ação
      const error = await productsService.findAllProducts();

      // Assertiva
      expect(error.type).to.equal('PRODUCTS_NOT_FOUND');
      expect(error.message).to.equal('products not found');
    });

    it('Recebe mensagem de erro caso passe um id inexistente', async () => {
      // Arranjo
      sinon.stub(productsModel, 'findProductsById').resolves(undefined);
      sinon.stub(validateProducts, 'validateProductsFindById').resolves({
        type: 'PRODUCT_NOT_FOUND',
        message: 'Product not found',
      });

      // Ação
      const error = await productsService.findProductsById(9999);

      // Assertiva
      expect(error.type).to.equal('PRODUCT_NOT_FOUND');
      expect(error.message).to.equal('Product not found');
    })
  });
  afterEach(sinon.restore);
});