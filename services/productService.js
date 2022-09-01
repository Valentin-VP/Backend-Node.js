const boom = require('@hapi/boom');
const { Op } = require('sequelize');

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

  async find(query) {
    const options = {
      include: ['category'],
      where: {},
    };
    const { limit, offset, price, price_min, price_max } = query;
    if (limit && offset) {
      options.limit = limit;
      options.offset = offset;
    }
    if (price) {
      options.where.price = price;
    }
    if (price_min && price_max) {
      options.where.price = {
        [Op.between]: [price_min, price_max],
        //o tambien
        // [Op.gte]: price_min,
        // [Op.lte]: price_max,
      };
    }
    const products = await models.Product.findAll(options);
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
