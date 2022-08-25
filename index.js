const express = require('express');
const routerApi = require('./routes');
const cors = require('cors');

const {
  logErrors,
  errorHandler,
  boomErrorHandler,
} = require('./middlewares/errorHandler');

const app = express();
const port = process.env.PORT || 3000;

// IMPORTANTE: Los endpoints especificos deben estar antes de los dinamicos

//se usa este middleware para recibir información de tipo json
app.use(express.json());
// para aceptar cualquier origen
// app.use(cors());

const whiteList = [
  'http://localhost:8080',
  'http://127.0.0.1:3000',
  'http://localhost:3000',
  'https://mywebsite.com',
];
const corsOptions = {
  origin: (origin, callback) => {
    console.log(`origin: ${origin}`);
    if (whiteList.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
};
app.use(cors(corsOptions));

routerApi(app);

//los middlewares de error se definen despues de los endpoints
app.use(logErrors);
app.use(boomErrorHandler);
app.use(errorHandler);

app.listen(port, () => console.log(`App listening on port ${port}`));
