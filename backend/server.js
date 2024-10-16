const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const statusRoutes = require('./routes/statusRoutes'); // Importando as rotas de status
const db = require('./models'); // Importando os modelos

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(bodyParser.json());

// Rotas
app.use('/status', statusRoutes); // Adicionando as rotas do módulo de status

// Testar a conexão com o banco de dados (opcional)
db.sequelize.sync().then(() => {
  console.log('Banco de dados conectado.');
  // Iniciando o servidor
  app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
  });
});
