const express = require('express');
const routerApi = require('./routes');
const cors = require('cors');
const { checkApiKey } = require('./middlewares/authHandler');

const {
  logErrors,
  errorHandler,
  boomErrorHandler,
  ormErrorHandler,
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
    if (whiteList.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
};
app.use(cors(corsOptions));

require('./utils/auth');

app.get('/', (req, res) => {
  res.send('Hello World');
});

app.get('/api-check', checkApiKey, (req, res) => {
  res.send('api checkeada');
});

routerApi(app);

//los middlewares de error se definen despues de los endpoints
app.use(logErrors);
app.use(ormErrorHandler);
app.use(boomErrorHandler);
app.use(errorHandler);

app.listen(port, () => console.log(`App listening on port ${port}`));
