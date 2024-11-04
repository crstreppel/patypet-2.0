const db = require('../models');
const jwt = require('jsonwebtoken');

// Login e registro de sessão
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

    // Encerra sessões ativas anteriores para o usuário
    await db.SessaoUsuario.update(
      { logoutAt: new Date() },
      { where: { usuarioId: usuario.id, logoutAt: null } }
    );

    // Cria uma nova sessão com a data/hora do login
    const sessao = await db.SessaoUsuario.create({
      usuarioId: usuario.id,
      loginAt: new Date()
    });

    // Gera um token JWT contendo o ID do usuário e o ID da sessão
    const token = jwt.sign(
      { id: usuario.id, sessaoId: sessao.id, username: usuario.username },
      'secreto',
      { expiresIn: '1h' }
    );

    res.status(200).json({ token });
  } catch (error) {
    console.error('Erro ao fazer login:', error);
    res.status(500).json({ error: 'Erro ao tentar logar' });
  }
};

// Logout e finalização da sessão
exports.logout = async (req, res) => {
  try {
    const sessaoId = req.user.sessaoId;  // Obtém o ID da sessão a partir do token JWT

    // Atualiza a data/hora de logout na sessão
    await db.SessaoUsuario.update(
      { logoutAt: new Date() },
      { where: { id: sessaoId } }
    );

    res.status(200).json({ message: 'Logout efetuado com sucesso.' });
  } catch (error) {
    console.error('Erro ao fazer logout:', error);
    res.status(500).json({ error: 'Erro ao fazer logout.' });
  }
};
