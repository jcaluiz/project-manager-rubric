const chai = require('chai');
const sinon = require('sinon');

const sinonChai = require('sinon-chai');

const { expect } = chai;

chai.use(sinonChai);

const salesService = require('../../../src/services/sales.service');
const salesController = require('../../../src/controllers/sales.controller');
const salesControllerMock = require('./mocks/salesControleMock');

describe('Verificando o controller de sales', () => {
  describe('Testando a unidade do controller de sales', () => {
    it('Verificando as requisições da busca de todos os sales', async () => {
      // Arranjo
      const res = {};
      const req = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon.stub(salesService, 'findAllSales')
        .resolves({ type: null, message: salesControllerMock.allSalesFind });

      // Ação
      await salesController.findAllSales(req, res);

      // Assertiva
      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(salesControllerMock.allSalesFind);
    });

    it('Verificando as requisições da inserção de um sale', async () => {
      // Arranjo
      const res = {};
      const req = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon.stub(salesService, 'insertSales')
        .resolves(salesControllerMock.insertControllerReturn);

      // Ação
      await salesController.insertSales(req, res);

      // Assertiva
      expect(res.status).to.have.been.calledWith(salesControllerMock.insertControllerReturn.status);
      expect(res.json).to.have.been.calledWith(salesControllerMock.insertControllerReturn.insert);
    });

    it('Verificando as requisições da busca por "ID" de um sale', async () => {
      // Arranjo
      const res = {};
      const req = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      req.params = sinon.stub().returns(1);

      sinon.stub(salesService, 'findSalesById')
        .resolves(salesControllerMock.findByIdInServices);

      // Ação
      await salesController.findSalesById(req, res);
      // console.log(req);
      // Assertiva
      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(salesControllerMock.findById);
    });

    describe('Testando as falhas do controller de sales', () => {
      it('Caso falte o productId no insert', async () => {
        const res = {};
        const req = {};

        res.status = sinon.stub().returns(res);
        res.json = sinon.stub().returns();

        sinon.stub(salesService, 'insertSales')
          .resolves({ message: '"productId" is required', status: 400 });
        
        await salesController.insertSales(req, res);

        expect(res.status).to.have.been.calledWith(400);
        expect(res.json).to.have.been.calledWith({ message: '"productId" is required' });

      });

      // it('Caso falte o id no findSalesById', async () => {
      //   const res = {};
      //   const req = {};

      //   res.status = sinon.stub().returns(res);
      //   res.json = sinon.stub().returns();
      //   req.params = sinon.stub().returns(9999);

      //   sinon.stub(salesService, 'findSalesById')
      //     .resolves({ type: 'SALE_NOT_FOUND', message: 'Sale not found' });

      //   const { message } = await salesController.insertSales(req, res);

      //   // expect(res.status).to.have.been.calledWith(404);
      //   // expect(res.json).to.have.been.calledWith({ message: message });

      // })
    });
  });
  afterEach(sinon.restore);
})