const express = require('express');

const router = express.Router();
// /api/categories

// middleware específico a este router sirve para tener un control de cuando se accede a un endpoint
router.use('/', function (req, res, next) {
  console.log('Accediendo a categories');
  next(); // se utiliza para que se ejecute el router.get
});

router.get('/categories/:catId/products/:prodId', (req, res) => {
  const { catId, prodId } = req.params;
  res.json({
    product: {
      prodId,
      catId,
    },
  });
});

module.exports = router;
