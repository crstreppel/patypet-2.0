const express = require('express');
const statusController = require('../controllers/statusController');
const authMiddleware = require('../middlewares/authMiddleware');
const router = express.Router();

// Rota para listar todos os status (sem autenticação, mas pode ser protegida se necessário)
router.get('/', statusController.getAllStatuses);

// Rota para criar um novo status (protegida por autenticação)
router.post('/status', authMiddleware, statusController.createStatus);

// Rota para editar um status (protegida por autenticação)
router.put('/:id', authMiddleware, statusController.updateStatus);

// Rota para excluir um status (protegida por autenticação)
router.delete('/:id', authMiddleware, statusController.deleteStatus);

module.exports = router;
