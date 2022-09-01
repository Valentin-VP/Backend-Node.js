const express = require('express');

const productsRouter = require('./productsRouter');
const categoriesRouter = require('./categoriesRouter');
const usersRouter = require('./usersRouter');
const customerRouter = require('./customersRouter');
const orderRouter = require('./ordersRouter');

function routerApi(app) {
    const router = express.Router();
    app.use('/api/v1', router);
    router.use('/products', productsRouter);
    router.use('/categories', categoriesRouter);
    router.use('/users', usersRouter);
    router.use('/customers', customerRouter);
    router.use('/orders', orderRouter);
}

module.exports = routerApi;
