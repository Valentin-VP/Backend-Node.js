const express = require('express');

const OrderService = require('../services/orderService');
const validatorHandler = require('../middlewares/validatorHandler');
const { createOrderSchema, getOrderSchema } = require('../schemas/orderSchema');

const router = express.Router();
const service = new OrderService();

router.get('/', async (req, res) => {
  const orders = await service.find();
  res.status(200).json(orders);
});

router.get('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const order = await service.findOne(id);
    res.status(200).json(order);
  } catch (error) {
    next(error);
  }
});

router.post(
  '/',
  validatorHandler(createOrderSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      const newOrder = await service.create(body);
      res.status(201).json(newOrder);
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
