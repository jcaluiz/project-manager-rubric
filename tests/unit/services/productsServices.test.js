const { expect } = require('chai');
const sinon = require('sinon');
const productsModel = require('../../../src/models/products.model');
const productsService = require('../../../src/services/products.service');
const validateProducts = require('../../../src/services/validations/validations');
const productsServicesMock = require('./mocks/productsServicesMock');

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
    });
    describe('Cadastro de um produto com valores válidos', () => {
      it('Retorna o ID do produto cadastrado', async () => {
        sinon.stub(productsModel, 'insertProduct').resolves([{ insertId: 1 }]);
        sinon.stub(productsModel, 'findProductsById')
          .resolves(productsServicesMock.allProducts[0]);
        
        const result = await productsService.insertProduct({
          name: productsServicesMock.allProducts[0].name
        })
        expect(result.type).to.equal(null);
        expect(result.message.insertId).to.deep.equal(productsServicesMock.allProducts[0].id);
      })
    })
  });
  afterEach(sinon.restore);
});