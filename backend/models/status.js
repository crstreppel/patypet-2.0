'use strict';
module.exports = (sequelize, DataTypes) => {
  const Status = sequelize.define('Status', {
    descricao: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {});
  return Status;
};
