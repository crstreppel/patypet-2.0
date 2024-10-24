const { Status } = require('../models');
const db = require('../models');

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

// Atualizar um status com verificação de senha
exports.updateStatus = async (req, res) => {
  try {
    const { descricao, password } = req.body;

    // Verifica se a senha está correta
    if (password !== 'senhaSegura') {
      return res.status(403).json({ error: 'Senha incorreta.' });
    }

    // Verifica se o status existe
    const status = await Status.findByPk(req.params.id);
    if (!status) {
      return res.status(404).json({ error: 'Status não encontrado.' });
    }

    // Atualiza a descrição do status
    status.descricao = descricao;
    await status.save();

    res.status(200).json(status);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao atualizar o status.' });
  }
};

// Excluir um status com verificação de senha
exports.deleteStatus = async (req, res) => {
  try {
    const { password } = req.body;

    // Verifica se a senha está correta
    if (password !== 'senhaSegura') {
      return res.status(403).json({ error: 'Senha incorreta.' });
    }

    // Verifica se o status existe
    const status = await Status.findByPk(req.params.id);
    if (!status) {
      return res.status(404).json({ error: 'Status não encontrado.' });
    }

    // Exclui o status
    await status.destroy();
    res.status(200).json({ message: 'Status excluído com sucesso.' });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao excluir o status.' });
  }
};
