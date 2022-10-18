const { expect } = require('chai');
const sinon = require('sinon');
const salesModel = require('../../../src/models/sales.models');
const salesService = require('../../../src/services/sales.service');
const validateSale = require('../../../src/services/validations/validations');
const salesServicesMock = require('./mocks/salesServicesMock');
const schema = require('../../../src/services/validations/schema');

describe('Verificando o Service de sales', () => {
  describe('Verificando casos de retorno undefined', () => {
    it('Recebe mensagem de erro caso não tenha nenhum sale cadastrado', async () => {
      // Arranjo
      sinon.stub(salesModel, 'findSalesByAll').resolves(undefined);

      // Ação
      const error = await salesService.findAllSales();
      // console.log(error);

      // Assertiva
      expect(error.type).to.equal('SALE_NOT_FOUND');
      expect(error.message).to.equal('Sale not found');
      expect(error.status).to.equal(404);
    });

    it('Recebe mensagem de erro caso não tenha o ID de sale cadastrado', async () => {
      // Arranjo
      sinon.stub(salesService, 'findSalesById').resolves(salesServicesMock.findIdError);

      // Ação
      const error = await salesService.findSalesById(9999);

      // Assertiva
      expect(error.type).to.equal('SALE_NOT_FOUND');
      expect(error.message).to.equal('Sale not found');
    });

    it('Retorna mensagem de erro caso o primeiro "quantity" for menor que 1', async () => {
      // sinon.stub(validateSale, 'validateInsertSales').resolves({
      //   message: '"quantity" must be greater than or equal to 1',
      //   status: 422
      // });

      sinon.stub(salesService, 'insertSales')
        .resolves({
          message: '"quantity" must be greater than or equal to 1',
          status: 422
        });
      
      const body = [
        {
          "productId": 1,
          "quantity": 0
        },
        {
          "productId": 2,
          "quantity": 5
        }
      ]

      const validateInsert = await validateSale.validateInsertSales(body);
      const result = await salesService.insertSales(body);
      const validateSchema = await schema.validateSalesSchema2(body);
      
      expect(validateSchema).to.deep.equal([{ message: '"quantity" must be greater than or equal to 1', status: 422 }]);
      expect(validateInsert.message).to.equal('"quantity" must be greater than or equal to 1');
      expect(validateInsert.status).to.equal(422);
      expect(result.message).to.equal('"quantity" must be greater than or equal to 1');
      expect(result.status).to.equal(422);
    });

    it('Retorna mensagem de erro caso o segundo "quantity" for menor que 1', async () => {
      // sinon.stub(validateSale, 'validateInsertSales').resolves({
      //   message: '"quantity" must be greater than or equal to 1',
      //   status: 422
      // });

      sinon.stub(salesService, 'insertSales')
        .resolves({
          message: '"quantity" must be greater than or equal to 1',
          status: 422
        });

      const body = [
        {
          "productId": 1,
          "quantity": 1
        },
        {
          "productId": 2,
          "quantity": 0
        }
      ]

      const validateInsert = await validateSale.validateInsertSales(body);
      const result = await salesService.insertSales(body);
      const validateSchema = await schema.validateSalesSchema2(body);
      
      expect(validateSchema).to.deep.equal([{ message: '"quantity" must be greater than or equal to 1', status: 422 }]);
      expect(validateInsert.message).to.equal('"quantity" must be greater than or equal to 1');
      expect(validateInsert.status).to.equal(422);
      expect(result.message).to.equal('"quantity" must be greater than or equal to 1');
      expect(result.status).to.equal(422);
    });

    it('Retorna mensagem de erro caso não tenha o "productId"', async () => {
      // sinon.stub(validateSale, 'validateInsertSales').resolves({
      //   message: '"productId" is required',
      //   status: 400
      // });

      sinon.stub(salesService, 'insertSales')
        .resolves({
          message: '"productId" is required',
          status: 400
        });

      const body = [
        {
          "quantity": 1
        },
        {
          "productId": 2,
          "quantity": 0
        }
      ]

      const validateInsert = await validateSale.validateInsertSales(body);
      const result = await salesService.insertSales(body);
      const validateSchema = await schema.validateSalesSchema2(body);
      
      expect(validateSchema).to.deep.equal([{ message: '"productId" is required', status: 400 }]);
      expect(validateInsert.message).to.equal('"productId" is required');
      expect(validateInsert.status).to.equal(400);
      expect(result.message).to.equal('"productId" is required');
      expect(result.status).to.equal(400);
    });

    it('Retorna mensagem de erro caso não tenha o "quantity"', async () => {
      // sinon.stub(validateSale, 'validateInsertSales').resolves({
      //   message: '"quantity" is required',
      //   status: 400
      // });

      sinon.stub(salesService, 'insertSales')
        .resolves({
          message: '"quantity" is required',
          status: 400
        });

      const body = [
        {
          "productId": 1
        },
        {
          "productId": 2,
          "quantity": 5
        }
      ];

      const validateInsert = await validateSale.validateInsertSales(body);
      const result = await salesService.insertSales(body);
      const validateSchema = await schema.validateSalesSchema2(body);
      
      expect(validateSchema).to.deep.equal([{ message: '"quantity" is required', status: 400 }]);
      expect(validateInsert.message).to.equal('"quantity" is required');
      expect(validateInsert.status).to.equal(400);
      expect(result.message).to.equal('"quantity" is required');
      expect(result.status).to.equal(400);
    });

    it('Retorna mensagem de erro caso não tenha o "quantity"', async () => {
      // sinon.stub(validateSale, 'validateInsertSales').resolves({
      //   message: 'Product not found',
      //   status: 400
      // });

      sinon.stub(salesService, 'insertSales')
        .resolves({
          message: 'Product not found',
          status: 400
        });

      const body = [
        {
          "productId": "",
          "quantity": 3
        },
        {
          "productId": 2,
          "quantity": 5
        }
      ];

      const validateInsert = await validateSale.validateInsertSales(body);
      const result = await salesService.insertSales(body);
      const validateSchema = await schema.validateSalesSchema2(body);

      expect(validateSchema).to.deep.equal([{ message: 'Product not found', status: 400 }]);
      expect(validateInsert.message).to.deep.equal('Product not found');
      expect(validateInsert.status).to.deep.equal(400);
      expect(result.message).to.deep.equal('Product not found');
      expect(result.status).to.deep.equal(400);
    });


    describe('Cadastro de um produto com valores válidos', () => {
      it('Retorna o ID do produto cadastrado', async () => {
        sinon.stub(salesModel, 'insertSales').resolves(salesServicesMock.startInsert);
        sinon.stub(salesService, 'insertSales')
          .resolves(salesServicesMock.insertServiceResolves);
        const body = [
          {
            "productId": 1,
            "quantity": 1
          },
          {
            "productId": 2,
            "quantity": 5
          }
        ]
        
        const result = await salesService.insertSales(body);

        expect(result.type).to.equal(null);
        expect(result.message).to.equal('');
        expect(result.status).to.equal(201);
        expect(result.insert).to.deep.equal(salesServicesMock.insertResolves);
      });

      it('Retorna o ID do produto cadastrado', async () => {
        sinon.stub(validateSale, 'validateInsertSales').resolves({ type: null, message: '' });
        sinon.stub(salesService, 'insertSales')
          .resolves(salesServicesMock.insertResolves);
        const body = [
          {
            "productId": 1,
            "quantity": 1
          },
          {
            "productId": 2,
            "quantity": 5
          }
        ]

        const validateInsert = await validateSale.validateInsertSales(body);
        const result = await salesService.insertSales(body);

        expect(validateInsert.message).to.equal('');
        expect(validateInsert.type).to.equal(null);
        expect(result).to.deep.equal(salesServicesMock.insertResolves);
      })
    })
  });
  afterEach(sinon.restore);
});