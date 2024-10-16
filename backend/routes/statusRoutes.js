const express = require('express');
const router = express.Router();
const statusController = require('../controllers/statusController');

// Rotas para o CRUD de Status
router.get('/', statusController.getAllStatuses);
router.post('/', statusController.createStatus);
router.put('/:id', statusController.updateStatus);
router.delete('/:id', statusController.deleteStatus);

module.exports = router;