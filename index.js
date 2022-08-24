const express = require('express');
const faker = require('faker');

const app = express();
const port = 3000;

// IMPORTANTE: Los endpoints especificos deben estar antes de los dinamicos

app.get('/', (req, res) => res.send('Hello World!'));

app.get('/new-route', (req, res) => res.send('new-route!'));

app.get('/products', (req, res) => {
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
});

//este endpoint es estatico, por ende va antes del id dinamico
app.get('/products/filter', (req, res) => {
  res.send('filter');
});

app.get('/products/:id', (req, res) => {
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

app.get('/users', (req, res) => {
  const { limit, offset } = req.query;
  if (limit && offset) {
    res.json({
      limit,
      offset,
    });
  } else {
    res.send('limit and offset are required');
  }
});

app.get('/categories/:catId/products/:prodId', (req, res) => {
  const { catId, prodId } = req.params;
  res.json({
    product: {
      prodId,
      catId,
    },
  });
});

app.listen(port, () => console.log(`App listening on port ${port}`));
