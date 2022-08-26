const faker = require('faker');
const boom = require('@hapi/boom');

const sequelize = require('../libs/sequelize');

class ProductService {
  constructor() {
    this.products = [];
    this.generateProducts();
  }

  generateProducts() {
    const limit = 100;
    for (let i = 0; i < 100; i++) {
      this.products.push({
        id: i,
        name: faker.commerce.productName(),
        price: parseInt(faker.commerce.price(), 10),
        image: faker.image.imageUrl(),
        isBlock: faker.datatype.boolean(),
      });
    }
  }

  async create(data) {
    const product = {
      // id: faker.datatype.number,
      id: 100,
      ...data,
    };
    this.products.push(product);
  }

  async update(id, data) {
    const index = this.products.findIndex((item) => item.id == id);
    if (index === -1) {
      throw boom.notFound('Product not found');
    }
    const product = this.products[index];
    this.products[index] = {
      ...product,
      ...data,
    };
    return this.products[index];
  }

  async delete(id) {
    const index = this.products.findIndex((item) => item.id == id);
    if (index === -1) {
      throw boom.notFound('Product not found');
    }
    this.products.splice(index, 1);
    return id;
  }

  async list() {
    const query = 'SELECT * FROM tasks';
    const [data, metadata]  = await sequelize.query(query);
    return data;
  }

  async find(id) {
    const product = this.products.find((product) => product.id == id);
    if (!product) {
      throw boom.notFound('Product not found');
    }
    if (product.isBlock) {
      throw boom.conflict('Product is blocked');
    }
    return product;
  }
}

module.exports = ProductService;
