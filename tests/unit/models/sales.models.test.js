const { expect } = require('chai');
const sinon = require('sinon');

const connection = require('../../../src/models/connection');
const salesModel = require('../../../src/models/sales.models');

const { allSales, insertSale } = require('./mocks/sales.model.mock');

describe('Teste de sales do Model', () => {
  it('Obtendo todos os sales', async () => {
    // Arranjo
    sinon.stub(connection, 'execute').resolves([allSales]);

    // Ação
    const result = await salesModel.findSalesByAll();
    // console.log(result);

    // Assertiva
    expect(result).to.equal(allSales);
  });

  it('Obtendo um sale pelo id', async () => {
    // Arranjo
    sinon.stub(connection, 'execute').resolves([allSales[0]]);

    // Ação
    const result = await salesModel.findSalesById(1);
    // console.log(result);
    // Assertiva
    expect(result).to.equal(allSales[0]);
  });
  it('Cadastrando um sale', async () => {
    sinon.stub(connection, 'execute').resolves([{ insertId: 42 }]);
    const result = await salesModel.insertSales(insertSale);
    console.log(result.id);
    expect(result.id).to.equal(42);
  });
  afterEach(sinon.restore);
})