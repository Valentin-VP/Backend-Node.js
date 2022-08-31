'use strict';

const {CategorySchema, CATEGORY_TABLE} = require('../../db/models/categoryModel');
const {ProductSchema, PRODUCT_TABLE} = require('../../db/models/productModel');

module.exports = {
  async up (queryInterface) {
    await queryInterface.createTable(CATEGORY_TABLE, CategorySchema);
    await queryInterface.createTable(PRODUCT_TABLE, ProductSchema);
  },

  async down (queryInterface) {
    //se dropea primero la dependiente y luego la padre
    await queryInterface.dropTable(PRODUCT_TABLE);
    await queryInterface.dropTable(CATEGORY_TABLE);
  }
};
