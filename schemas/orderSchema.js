const Joi = require('joi');

const id = Joi.number().integer();
const customerId = Joi.number().integer();

const getOrderSchema = Joi.object().keys({
  id: id.required(),
});

const createOrderSchema = Joi.object().keys({
  customerId: customerId.required(),
});

module.exports = { getOrderSchema, createOrderSchema };
