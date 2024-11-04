// models/SessaoUsuario.js

module.exports = (sequelize, DataTypes) => {
    const SessaoUsuario = sequelize.define('SessaoUsuario', {
      usuarioId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Usuarios',
          key: 'id'
        }
      },
      loginAt: {  // Data/hora de login
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
      },
      logoutAt: {  // Data/hora de logout
        type: DataTypes.DATE,
        allowNull: true
      }
    });
    return SessaoUsuario;
  };
  