const express = require('express');
const faker = require('faker');

const router = express.Router();
// /api/products

// middleware específico a este router sirve para tener un control de cuando se accede a un endpoint
// router.use('/', function (req, res, next) {
//   console.log('Hola, soy el middleware en products');
//   next() // se utiliza para que se ejecute el router.get
// })

// define the home page de products
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
  res.json(products);
  next();
});

//este endpoint es estatico, por ende va antes del id dinamico
router.get('/products/filter', (req, res) => {
  res.send('filter');
});

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
