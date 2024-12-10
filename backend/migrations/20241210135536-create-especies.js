'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {up: async (queryInterface, Sequelize) => {
  await queryInterface.createTable('Especies', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    descricao: {
      type: Sequelize.STRING,
      allowNull: false
    },
    status: {
      type: Sequelize.CHAR,
      allowNull: false,
      defaultValue: 'A' // Sempre ativo
    },
    createdAt: {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: Sequelize.NOW
    },
    updatedAt: {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: Sequelize.NOW
    }
  });
},

down: async (queryInterface, Sequelize) => {
  await queryInterface.dropTable('Especies');
}
};
