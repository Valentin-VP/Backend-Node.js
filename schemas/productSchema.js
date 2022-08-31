const joi = require('joi');

const id = joi.number().integer().min(1);
const name = joi.string().alphanum().min(3).max(50);
const price = joi.number().integer().min(1);
const description = joi.string().min(10);
const image = joi.string().uri();

const createProductSchema = joi.object({
  name: name.required(),
  price: price.required(),
  description: description.required(),
  image: image.required(),
});

const updateProductSchema = joi.object({
  name: name,
  price: price,
  description: description,
  image: image,
});

const getProductSchema = joi.object({
  id: id.required(),
});

module.exports = { createProductSchema, updateProductSchema, getProductSchema };
