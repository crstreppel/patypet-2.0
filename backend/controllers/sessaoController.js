// controllers/sessaoController.js
const db = require('../models');

// Logout - registra apenas a data/hora de logout na sessão atual
exports.logout = async (req, res) => {
  try {
    const sessaoId = req.user.sessaoId;  // Obtém o ID da sessão a partir do token JWT
    console.log('Recebendo requisição de logout para a sessão:', sessaoId);  // Log para depuração

    // Atualiza a data e hora de logout para a sessão atual
    await db.SessaoUsuario.update(
      { logoutAt: new Date() },
      { where: { id: sessaoId } }
    );

    res.status(200).json({ message: 'Logout registrado com sucesso.' });
  } catch (error) {
    console.error('Erro ao registrar logout:', error);
    res.status(500).json({ error: 'Erro ao registrar logout.' });
  }
};
