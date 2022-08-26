const faker = require('faker');
const boom = require('@hapi/boom');

const pool = require('../libs/postgresPool');

class ProductService {
  constructor() {
    this.products = [];
    this.generateProducts();
    this.pool = pool;
    this.pool.on('error', (err, client) => {
      console.error('Unexpected error on idle client', err);
      process.exit(-1);
    });
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
    const rta  = await this.pool.query(query);
    return rta.rows;
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
