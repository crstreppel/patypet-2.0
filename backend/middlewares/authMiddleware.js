const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const token = req.headers['authorization'];

  if (!token) {
    return res.status(403).json({ error: 'Token não fornecido' });
  }

  try {
    const decoded = jwt.verify(token, 'secreto');
    req.user = decoded; // Armazena os dados do usuário na requisição
    next();
  } catch (error) {
    return res.status(401).json({ error: 'Token inválido' });
  }
};
