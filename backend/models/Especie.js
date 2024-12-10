module.exports = (sequelize, DataTypes) => {
  const Especie = sequelize.define('Especie', {
    descricao: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'A descrição da espécie é obrigatória.'
        }
      }
    },
    statusId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1, // Status padrão: Ativo
      references: {
        model: 'Statuses',
        key: 'id'
      }
    }
  });

  Especie.associate = (models) => {
    Especie.belongsTo(models.Status, {
      foreignKey: 'statusId',
      as: 'status'
    });
  };

  return Especie;
};
