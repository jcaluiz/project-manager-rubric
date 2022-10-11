const chai = require('chai');
const sinon = require('sinon');

const sinonChai = require('sinon-chai');

const { expect } = chai;

chai.use(sinonChai);

const productsService = require('../../../src/services/products.service');
const productsController = require('../../../src/controllers/products.controller');
const productsControllerMock = require('./mocks/productsControleMock');

describe('Verificando o controller de produtos', () => {
  describe('Testando a unidade do controller de produtos', () => {
    it('Verificando as requisições da busca de todos os produtos', async () => {
      // Arranjo
      const res = {};
      const req = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon.stub(productsService, 'findAllProducts')
        .resolves({ type: null, message: productsControllerMock.products });

      // Ação
      await productsController.findAllProducts(req, res);

      // Assertiva
      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(productsControllerMock.products);
    })
  })
  afterEach(sinon.restore);
})