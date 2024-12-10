const express = require('express');
const especieController = require('../controllers/especieController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

// Rotas do CRUD de espécies
router.get('/', authMiddleware, especieController.getAllEspecies); // Listar
router.post('/', authMiddleware, especieController.createEspecie); // Criar
router.put('/:id', authMiddleware, especieController.updateEspecie); // Atualizar
router.delete('/:id', authMiddleware, especieController.deleteEspecie); // Desativar

module.exports = router;
