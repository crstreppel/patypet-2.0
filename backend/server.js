const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const statusRoutes = require('./routes/statusRoutes'); // Importando as rotas de status
const usuarioRoutes = require('./routes/usuarioRoutes'); // Rotas de usuário
const authRoutes = require('./routes/authRoutes'); // Rotas de autenticação
const sessaoRoutes = require('./routes/sessaoRoutes');  // Importa as rotas de sessão

const db = require('./models'); // Importando os modelos

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(bodyParser.json());

// Rotas
app.use('/', statusRoutes); // Rota para o módulo de status
app.use('/', usuarioRoutes); // Rota para usuários
app.use('/', authRoutes); // Rota para autenticação
app.use('/', sessaoRoutes); // Rota para rotas de sessão

// Testar a conexão com o banco de dados (opcional)
db.sequelize.sync().then(() => {
  console.log('Banco de dados conectado.');
  // Iniciando o servidor
  app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
  });
});
