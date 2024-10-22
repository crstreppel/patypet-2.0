const express = require('express');
const statusController = require('../controllers/statusController');
const authMiddleware = require('../middlewares/authMiddleware');
const router = express.Router();

// Protege as rotas de criação, edição e exclusão
router.put('/:id', authMiddleware, statusController.updateStatus);
router.delete('/:id', authMiddleware, statusController.deleteStatus);

module.exports = router;
