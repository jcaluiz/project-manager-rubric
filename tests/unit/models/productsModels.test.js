const { expect } = require('chai');
const sinon = require('sinon');

const connection = require('../../../src/models/connection');
const productsModel = require('../../../src/models/products.model');

const { products, newProduct } = require('./mocks/products.model.mock');

describe('Teste de produtos do Model', () => {
  it('Obtendo todos os produtos', async () => {
    // Arranjo
    sinon.stub(connection, 'execute').resolves([products]);

    // Ação
    const result = await productsModel.findAllProducts();
    // console.log(result);

    // Assertiva
    expect(result).to.equal(products);
  });

  it('Obtendo um produto pelo id', async () => {
    // Arranjo
    sinon.stub(connection, 'execute').resolves([products[0]]);

    // Ação
    const result = await productsModel.findProductsById(1);
    // console.log(result);
    // Assertiva
    expect(result).to.equal(products[0]);
  });
  it('Cadastrando um produto', async  () => {
    sinon.stub(connection, 'execute').resolves([{ insertId: 42 }]);
    const result = await productsModel.insertProduct(newProduct);
    expect(result.insertId).to.equal(42);
  });
  afterEach(sinon.restore);
})