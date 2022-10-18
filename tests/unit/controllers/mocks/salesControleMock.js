const allSalesFind = [
  {
    "saleId": 1,
    "date": "2022-10-14T22:31:34.000Z",
    "productId": 1,
    "quantity": 5
  },
  {
    "saleId": 1,
    "date": "2022-10-14T22:31:34.000Z",
    "productId": 2,
    "quantity": 10
  },
  {
    "saleId": 2,
    "date": "2022-10-14T22:31:34.000Z",
    "productId": 3,
    "quantity": 15
  },
  {
    "saleId": 3,
    "date": "2022-10-14T23:43:46.000Z",
    "productId": 1,
    "quantity": 1
  },
  {
    "saleId": 3,
    "date": "2022-10-14T23:43:46.000Z",
    "productId": 2,
    "quantity": 5
  },
  {
    "saleId": 4,
    "date": "2022-10-17T14:16:04.000Z",
    "productId": 1,
    "quantity": 1
  },
  {
    "saleId": 4,
    "date": "2022-10-17T14:16:04.000Z",
    "productId": 2,
    "quantity": 5
  },
  {
    "saleId": 5,
    "date": "2022-10-17T14:23:44.000Z",
    "productId": 1,
    "quantity": 1
  },
  {
    "saleId": 5,
    "date": "2022-10-17T14:23:44.000Z",
    "productId": 2,
    "quantity": 5
  },
  {
    "saleId": 6,
    "date": "2022-10-17T14:27:04.000Z",
    "productId": 1,
    "quantity": 1
  },
  {
    "saleId": 6,
    "date": "2022-10-17T14:27:04.000Z",
    "productId": 2,
    "quantity": 5
  },
  {
    "saleId": 7,
    "date": "2022-10-17T14:31:01.000Z",
    "productId": 1,
    "quantity": 1
  },
  {
    "saleId": 7,
    "date": "2022-10-17T14:31:01.000Z",
    "productId": 2,
    "quantity": 5
  },
  {
    "saleId": 8,
    "date": "2022-10-17T14:39:16.000Z",
    "productId": 1,
    "quantity": 1
  },
  {
    "saleId": 8,
    "date": "2022-10-17T14:39:16.000Z",
    "productId": 2,
    "quantity": 5
  },
  {
    "saleId": 9,
    "date": "2022-10-18T13:41:14.000Z",
    "productId": 1,
    "quantity": 3
  },
  {
    "saleId": 9,
    "date": "2022-10-18T13:41:14.000Z",
    "productId": 2,
    "quantity": 5
  }
];

const insertControllerReturn = {
  type: null,
  message: '',
  status: 201,
  insert: {
    id: 10, itemsSold: [
      {
        "productId": 1,
        "quantity": 3
      },
      {
        "productId": 2,
        "quantity": 5
      }
    ]
  }
};

const findById = [
  {
    "date": "2022-10-14T22:31:34.000Z",
    "productId": 1,
    "quantity": 5
  },
  {
    "date": "2022-10-14T22:31:34.000Z",
    "productId": 2,
    "quantity": 10
  }
];

const findByIdInServices = {
  type: null,
  message: [
    { date: '2022-10-14T22:31:34.000Z', productId: 1, quantity: 5 },
    { date: '2022-10-14T22:31:34.000Z', productId: 2, quantity: 10 }
  ]
};

module.exports = {
  allSalesFind,
  insertControllerReturn,
  findById,
  findByIdInServices,
}