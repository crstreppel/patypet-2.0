'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Adicionar o campo status
    await queryInterface.addColumn('Statuses', 'status', {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: 'A'  // 'A' para ativo por padrão
    });

    // Adicionar o campo deletedAt
    await queryInterface.addColumn('Statuses', 'deletedAt', {
      type: Sequelize.DATE,
      allowNull: true  // Permite null, pois o registro pode não estar excluído
    });

    // Adicionar o campo usuarioId, permitindo null
    await queryInterface.addColumn('Statuses', 'usuarioId', {
      type: Sequelize.INTEGER,
      allowNull: true,  // Permite NULL para suportar a ação SET NULL
      references: {
        model: 'Usuarios', // Nome da tabela de usuários (ajuste conforme necessário)
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL'
    });
  },

  down: async (queryInterface, Sequelize) => {
    // Remover o campo status
    await queryInterface.removeColumn('Statuses', 'status');

    // Remover o campo deletedAt
    await queryInterface.removeColumn('Statuses', 'deletedAt');

    // Remover o campo usuarioId
    await queryInterface.removeColumn('Statuses', 'usuarioId');
  }
};