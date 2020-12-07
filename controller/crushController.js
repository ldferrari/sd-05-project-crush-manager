const {
  getCrush,
  getAllCrushs,
  removeCrush,
  findByName,
  updateCrushM,
} = require('../models/crushModel');

const getCrushs = async (_req, res) => {
  const crushs = await getAllCrushs();

  if (!crushs) {
    return res.status(400).json({ message: 'Não está vindo nenhum crush' });
  }
  return res.status(200).json(crushs);
};

const getCrushById = async (req, res) => {
  const { id } = req.params;
  const crush = await getCrush(id);
  if (!crush) {
    return res.status(404).json({ message: 'Crush não encontrado' });
  }
  return res.status(200).json(crush);
};

const updateCrush = async (req, res) => {
  const { name, age, date } = req.body;
  const { id } = req.params;
  const crushs = await getAllCrushs();
  if (!crushs) {
    return res.status(404).json({ message: 'Crush não encontrado' });
  }
  const filteredCrush = crushs.filter((el) => el.id !== id);
  const newCrush = { name, age, id, date };
  const newArrCrush = [...filteredCrush, newCrush];
  await updateCrushM(newArrCrush);
  const alteredCrush = await getCrush(id);
  if (!alteredCrush) {
    return res.status(404).json({ message: 'Nada alterado' });
  }

  return res.status(200).json({
    name: alteredCrush.name,
    age: alteredCrush.age,
    date: alteredCrush.date,
  });
};

const deleteCrush = async (req, res) => {
  const { id } = req.params;
  const crush = await removeCrush(id);
  if (!crush) {
    return res.status(404).json({ message: 'Crush não encontrado' });
  }
  return res.status(200).json(crush);
};

const searchCrush = async (req, res) => {
  const { q } = req.query;
  const data = await findByName(q);
  if (!data) {
    res.status(404).json({ message: 'Crush não encontrado' });
  }
  return res.status(200).json(data);
};

module.exports = { getCrushById, getCrushs, deleteCrush, updateCrush, searchCrush };
