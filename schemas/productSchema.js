const joi = require('joi');

const id = joi.number().integer().min(1);
const name = joi.string().alphanum().min(3).max(50);
const price = joi.number().integer().min(1);
const description = joi.string().min(10);
const image = joi.string().uri();
const categoryId = joi.number().integer().min(1);

const price_min = joi.number().integer();
const price_max = joi.number().integer();

const limit = joi.number().integer();
const offset = joi.number().integer();

const createProductSchema = joi.object({
  name: name.required(),
  price: price.required(),
  description: description.required(),
  image: image.required(),
  categoryId: categoryId.required(),
});

const updateProductSchema = joi.object({
  name: name,
  price: price,
  description: description,
  image: image,
  categoryId: categoryId,
});

const getProductSchema = joi.object({
  id: id.required(),

});

const queryProductSchema = joi.object({
  limit: limit,
  offset: offset,
  price: price,
  price_min: price_min,
  price_max: price_max.when('price_min', {
    is: joi.exist(),
    then: price_max.required(),
  })
});

module.exports = { createProductSchema, updateProductSchema, getProductSchema, queryProductSchema };
