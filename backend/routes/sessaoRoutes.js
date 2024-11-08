// routes/sessaoRoutes.js
const express = require('express');
const sessaoController = require('../controllers/sessaoController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

// Define a rota de logout protegida pelo middleware de autenticação
router.post('/logout', authMiddleware, sessaoController.logout);

module.exports = router;
