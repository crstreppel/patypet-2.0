const { Status } = require('../models');

// Listar todos os status
exports.getAllStatuses = async (req, res) => {
  try {
    const statuses = await Status.findAll();
    res.json(statuses);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar os status.' });
  }
};

// Criar um novo status
exports.createStatus = async (req, res) => {
  try {
    const { descricao } = req.body;
    console.log('Descrição recebida:', descricao);
    if (!descricao) {
      return res.status(400).json({ error: 'Descrição é obrigatória.' });
    }
    const newStatus = await Status.create({ descricao });
    res.status(201).json(newStatus);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao criar o status.' });
  }
};

// Atualizar um status
exports.updateStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { descricao } = req.body;
    const status = await Status.findByPk(id);
    if (!status) {
      return res.status(404).json({ error: 'Status não encontrado.' });
    }
    await status.update({ descricao });
    res.json(status);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao atualizar o status.' });
  }
};

// Excluir um status
exports.deleteStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const status = await Status.findByPk(id);
    if (!status) {
      return res.status(404).json({ error: 'Status não encontrado.' });
    }
    await status.destroy();
    res.json({ message: 'Status excluído com sucesso.' });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao excluir o status.' });
  }
};
