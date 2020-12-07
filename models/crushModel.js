const { readFileCrush } = require('./readFile');
const { writeCrushFile } = require('./writeFile');

const getAllCrushs = () => readFileCrush();

const getCrush = (id) =>
  readFileCrush().then((crushes) => crushes.find((crush) => crush.id === parseInt(id, 10)));

const editCrush = (id) =>
  writeCrushFile().then((crushes) => crushes.find((crush) => crush.id === parseInt(id, 10)));

const removeCrush = (id) =>
  readFileCrush().then((crushes) => crushes.delete((crush) => crush.id === parseInt(id, 10)));
// .where('id = :id') -> posso usar

const findByName = (name) =>
  readFileCrush().then((crushes) => crushes.filter((crush) => crush.includes(name)));

module.exports = { getCrush, getAllCrushs, editCrush, removeCrush, findByName };
