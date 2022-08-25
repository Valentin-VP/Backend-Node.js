const express = require('express');

const ProductService = require('../services/productService');
const validatorHandler = require('../middlewares/validatorHandler');
const { createProductSchema, updateProductSchema, getProductSchema } = require('../schemas/productSchema');

// /api/v1/products
const router = express.Router();
const productService = new ProductService();

// middleware específico a este router sirve para tener un control de cuando se accede a un endpoint
// router.use('/', function (req, res, next) {
//   console.log('Hola, soy el middleware en products');
//   next() // se utiliza para que se ejecute el router.get
// })

// define the home page de products
// api/v1/products GET
router.get('/', async (req, res) => {
  const products = await productService.list();
  res.status(200).json(products);
});

// api/v1/products POST
router.post('/',
validatorHandler(createProductSchema, 'body'),
async (req, res) => {
  const body = req.body;
  const newProduct = await productService.create(body);
  res.status(201).json(newProduct);
});

// api/v1/products/:id PATCH
router.patch('/:id',
validatorHandler(getProductSchema, 'params'),
validatorHandler(updateProductSchema, 'body'),
async (req, res, next) => {
  try {
    const { id } = req.params;
    const body = req.body;
    const updatedProduct = await productService.update(id, body);
    res.status(200).json(updatedProduct);
  } catch (error) {
    next(error);
  }
});

// api/v1/products/:id DELETE
router.delete('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedProduct = await productService.delete(id);
    res.status(200).json(deletedProduct);
  } catch (error) {
    next(error);
  }
});

// api/v1/products/:id GET
router.get('/:id',
validatorHandler(getProductSchema, 'params'),
async (req, res, next) => {
  try {
    const { id } = req.params;
    const product = await productService.find(id);
    res.status(200).json(product);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
