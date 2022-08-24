const faker = require('faker');

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
      throw new Error('Product not found');
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
      throw new Error('Product not found');
    }
    this.products.splice(index, 1);
    return id;
  }

  list() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(this.products);
      }, 3000);
    });
  }

  async find(id) {
    return this.products.find((product) => product.id == id);
  }
}

module.exports = ProductService;
