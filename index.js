const express = require('express');
const routerApi = require('./routes');
const products = require('./routes/products.router');

const app = express();
const port = 3000;

// IMPORTANTE: Los endpoints especificos deben estar antes de los dinamicos

// app.get('/', (req, res) => res.send('Hello World!'));

// app.get('/new-route', (req, res) => res.send('new-route!'));

routerApi(app);

app.listen(port, () => console.log(`App listening on port ${port}`));
