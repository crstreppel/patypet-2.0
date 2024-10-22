//routes/usuarioRoutes
const express = require('express');
const router = express.Router();
const usuariosController = require('../controllers/usuarioController');

// Definir a rota POST para criar um usuário
router.post('/usuarios', usuariosController.createUsuario);

module.exports = router;
