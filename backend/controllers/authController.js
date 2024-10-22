const db = require('../models');
const jwt = require('jsonwebtoken');

exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Verifica se o usuário existe
    const usuario = await db.Usuario.findOne({ where: { username } });
    if (!usuario) {
      return res.status(404).json({ error: 'Usuário não encontrado' });
    }

    // Verifica se a senha está correta
    const isPasswordValid = await usuario.validPassword(password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Senha incorreta' });
    }

    // Gera um token JWT
    const token = jwt.sign({ id: usuario.id, username: usuario.username }, 'secreto', { expiresIn: '1h' });

    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao tentar logar' });
  }
};
