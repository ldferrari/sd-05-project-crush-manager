const { readFileCrush } = require('./readFile');
const { writeCrushFile } = require('./writeFile');

const getAllCrushs = () => readFileCrush();

const getCrush = (id) =>
  readFileCrush().then((crushes) => crushes.filter((crush) => crush.id === parseInt(id, 10)));

const updateCrush = (arr) => writeCrushFile(arr);

const removeCrush = (id) =>
  readFileCrush().then((crushes) => crushes.filter((crush) => crush.id !== parseInt(id, 10)));

const findByName = (name) =>
  readFileCrush().then((crushes) => crushes.filter((crush) => crush.name === name));

module.exports = { getCrush, getAllCrushs, updateCrush, removeCrush, findByName };
