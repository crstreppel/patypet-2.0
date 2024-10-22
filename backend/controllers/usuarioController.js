// controllers/usuarioController.js
const db = require('../models');

exports.createUsuario = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ error: 'Nome de usuário e senha são obrigatórios.' });
    }

    // Verifica se o usuário já existe
    const usuarioExistente = await db.Usuario.findOne({ where: { username } });
    if (usuarioExistente) {
      return res.status(400).json({ error: 'Usuário já existe.' });
    }

    // Cria o usuário e já criptografa a senha
    const newUsuario = await db.Usuario.create({ username, password });

    res.status(201).json({ message: 'Usuário criado com sucesso!', usuario: newUsuario });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao criar o usuário.' });
  }
};
