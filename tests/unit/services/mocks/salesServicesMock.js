const findIdError = { type: 'SALE_NOT_FOUND', message: 'Sale not found' };

const insertResolves = {
  id: 4,
  itemsSold: [
    {
      productId: 1,
      quantity: 1
    },
    {
      productId: 2,
      quantity: 5
    }
  ]
}

const startInsert = { id: insertResolves.id, itemsSold: insertResolves.itemsSold };

const insertServiceResolves = {
  type: null,
  message: '',
  status: 201,
  insert: startInsert,
}

const quantityLessThanOne = [
  {
    message: '"quantity" must be greater than or equal to 1',
    status: 422
  }
]

module.exports = {
  findIdError,
  insertResolves,
  startInsert,
  insertServiceResolves,
  quantityLessThanOne,
};