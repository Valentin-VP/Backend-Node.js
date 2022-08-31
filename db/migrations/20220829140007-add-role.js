'use strict';

const { USER_TABLE, UserSchema } = require('../models/userModel');

//error al ya tener un rol creado para el usuario

module.exports = {
  async up (queryInterface, Sequelize) {
    // await queryInterface.addColumn(USER_TABLE, 'role', UserSchema.role);
  },

  async down (queryInterface, Sequelize) {
    // await queryInterface.removeColumn(USER_TABLE, 'role');
  }
};
