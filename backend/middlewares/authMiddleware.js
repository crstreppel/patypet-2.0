const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  // Recupera o cabeçalho de autorização e o token JWT
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(403).json({ error: 'Token não fornecido. Acesso negado.' });
  }

  try {
    // Verifica e decodifica o token JWT
    const decoded = jwt.verify(token, 'secreto');
    
    // Armazena as informações do usuário e da sessão na requisição
    req.user = {
      id: decoded.id,
      sessaoId: decoded.sessaoId,
      username: decoded.username
    };
    
    next(); // Continua para o próximo middleware ou controlador
  } catch (error) {
    return res.status(401).json({ error: 'Token inválido ou expirado.' });
  }
};
