const express = require('express');
const faker = require('faker');

const router = express.Router();
// /api/v1/products

// middleware específico a este router sirve para tener un control de cuando se accede a un endpoint
// router.use('/', function (req, res, next) {
//   console.log('Hola, soy el middleware en products');
//   next() // se utiliza para que se ejecute el router.get
// })

// define the home page de products
// api/v1/products GET
router.get('/', (req, res, next) => {
  const products = [];
  const { size } = req.query;
  const limit = size || 10;
  for (let i = 0; i < limit; i++) {
    products.push({
      id: faker.datatype.number(),
      name: faker.commerce.productName(),
      price: parseInt(faker.commerce.price(), 10),
      image: faker.image.imageUrl(),
    });
  }
  res.status(201).json(products);
  next();
});

// api/v1/products POST
router.post('/', (req, res, next) => {
  const body = req.body;
  res.status(204).json({
    message: 'created',
    data: body,
  });
});

// api/v1/products/:id PATCH
router.patch('/:id', (req, res, next) => {
  const { id } = req.params;
  const body = req.body;
  res.json({
    message: 'updated',
    data: {
      id,
      data: body,
    },
  });
});

// api/v1/products/:id DELETE
router.delete('/:id', (req, res, next) => {
  const { id } = req.params;
  res.json({
    message: 'deleted',
    id,
  });
});

// api/v1/products/:id GET
router.get('/products/:id', (req, res) => {
  const { id } = req.params;
  res.json({
    product: {
      id,
      name: 'product 1',
      price: '100',
      description: 'description 1',
      image:
        'https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png',
    },
  });
});

module.exports = router;
