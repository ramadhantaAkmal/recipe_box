'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('category', [
      { name: 'Appetizers', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Beverages', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Breads', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Breakfast', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Desserts', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Main dishes', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Salads', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Sauces and dressings', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Side dishes', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Soups', createdAt: new Date(), updatedAt: new Date() },
      { name: 'no category', createdAt: new Date(), updatedAt: new Date() },
    ]);
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('category', null, {});
  }
};
