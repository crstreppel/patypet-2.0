const bcrypt = require('bcrypt');

module.exports = (sequelize, DataTypes) => {
  const Usuario = sequelize.define('Usuario', {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    hooks: {
      beforeCreate: async (usuario) => {
        const salt = await bcrypt.genSalt(10);
        usuario.password = await bcrypt.hash(usuario.password, salt);
      }
    }
  });

  Usuario.prototype.validPassword = async function(password) {
    return await bcrypt.compare(password, this.password);
  };

  return Usuario;
}; 
