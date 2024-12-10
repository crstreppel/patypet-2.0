const { Especie, Status } = require('../models');

// Criar uma nova espécie
exports.createEspecie = async (req, res) => {
  try {
    const { descricao } = req.body;

    if (!descricao) {
      return res.status(400).json({ error: 'A descrição da espécie é obrigatória.' });
    }

    // Cria a espécie com o status padrão (ativo)
    const especie = await Especie.create({ descricao, statusId: 1 });
    res.status(201).json(especie);
  } catch (error) {
    console.error('Erro ao criar espécie:', error);
    res.status(500).json({ error: 'Erro ao criar espécie.' });
  }
};

// Listar todas as espécies com status
exports.getAllEspecies = async (req, res) => {
  try {
    const especies = await Especie.findAll({
      include: {
        model: Status,
        as: 'status',
        attributes: ['descricao'] // Inclui a descrição do status
      }
    });
    res.status(200).json(especies);
  } catch (error) {
    console.error('Erro ao listar espécies:', error);
    res.status(500).json({ error: 'Erro ao buscar espécies.' });
  }
};

// Atualizar uma espécie
exports.updateEspecie = async (req, res) => {
  try {
    const { id } = req.params;
    const { descricao } = req.body;

    const especie = await Especie.findByPk(id);
    if (!especie) {
      return res.status(404).json({ error: 'Espécie não encontrada.' });
    }

    await especie.update({ descricao });
    res.status(200).json(especie);
  } catch (error) {
    console.error('Erro ao atualizar espécie:', error);
    res.status(500).json({ error: 'Erro ao atualizar espécie.' });
  }
};

// Desativar uma espécie
exports.deleteEspecie = async (req, res) => {
  try {
    const { id } = req.params;

    const especie = await Especie.findByPk(id);
    if (!especie) {
      return res.status(404).json({ error: 'Espécie não encontrada.' });
    }

    await especie.update({ statusId: 2 }); // Marca como inativo (statusId = 2)
    res.status(200).json({ message: 'Espécie desativada com sucesso.' });
  } catch (error) {
    console.error('Erro ao desativar espécie:', error);
    res.status(500).json({ error: 'Erro ao desativar espécie.' });
  }
};
