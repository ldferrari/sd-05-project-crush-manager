const { getCrush, removeCrush } = require('../models/crushModel');
const { readFileCrush } = require('../models/readFile');
const { writeCrushFile } = require('../models/writeFile');

const getAllCrushs = async (_req, res) => {
  const crushs = await readFileCrush();
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
  const { id: paramId } = req.params;
  const crushs = await readFileCrush();
  if (!crushs) {
    return res.status(404).json({ message: 'Crush não encontrado' });
  }
  const id = parseInt(paramId, 10);
  const filteredCrush = crushs.filter((el) => el.id !== id);
  const newCrush = { name, age, id, date };
  const newArrCrush = [...filteredCrush, newCrush];
  await writeCrushFile(newArrCrush);
  const alteredCrush = await getCrush(id);
  if (!alteredCrush) {
    return res.status(404).json({ message: 'Nada alterado' });
  }

  return res.status(200).json({
    id: alteredCrush.id,
    name: alteredCrush.name,
    age: alteredCrush.age,
    date: alteredCrush.date,
  });
};

const deleteCrush = async (req, res) => {
  const { id } = req.params;
  console.log(id);
  const crushs = await readFileCrush();
  console.log(crushs);
  const newFileCrush = removeCrush(crushs);
  if (!newFileCrush) {
    return res.status(404).json({ message: 'Crush não encontrado' });
  }
  return res.status(200).json({ message: 'Crush deletado com sucesso' });
};

const searchCrush = async (req, res) => {
  const { q } = req.query;
  const crushs = await readFileCrush();
  const data = crushs.filter((crush) => crush.name.includes(q));
  if (!data) {
    res.status(404).json({ message: 'Crush não encontrado' });
  }
  return res.status(200).json(data);
};

module.exports = { getCrushById, getAllCrushs, deleteCrush, updateCrush, searchCrush };
