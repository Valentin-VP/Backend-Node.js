const express = require('express');
const routerApi = require('./routes');
const products = require('./routes/products.router');

const app = express();
const port = 3000;

// IMPORTANTE: Los endpoints especificos deben estar antes de los dinamicos

//se usa este middleware para recibir información de tipo json
app.use(express.json());

routerApi(app);

app.listen(port, () => console.log(`App listening on port ${port}`));
