const boom = require('@hapi/boom');

const { models } = require('../libs/sequelize');

class ProductService {
  constructor() {}

  // generateProducts() {
  //   const limit = 100;
  //   for (let i = 0; i < 100; i++) {
  //     this.products.push({
  //       id: i,
  //       name: faker.commerce.productName(),
  //       price: parseInt(faker.commerce.price(), 10),
  //       image: faker.image.imageUrl(),
  //       isBlock: faker.datatype.boolean(),
  //     });
  //   }
  // }

  async create(data) {
    const newProduct = await models.Product.create(data);
    return newProduct;
  }

  async update(id, data) {
    const product = await this.findOne(id);
    const updatedProduct = await product.update(data);
    return updatedProduct;
  }

  async delete(id) {
    const product = await this.findOne(id);
    await product.destroy();
    return id;
  }

  async find() {
    const products = await models.Product.findAll({
      include: ['category'],
    });
    return products;
  }

  async findOne(id) {
    const product = models.products.findByPk(id);
    if (!product) {
      throw boom.notFound('Product not found');
    }
    // if (product.isBlock) {
    //   throw boom.conflict('Product is blocked');
    // }
    return product;
  }
}

module.exports = ProductService;
