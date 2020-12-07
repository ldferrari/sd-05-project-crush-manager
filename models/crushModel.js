const { readFileCrush } = require('./readFile');

const getAllCrushs = () => readFileCrush();

const getCrush = (id) =>
  readFileCrush().then((crushes) => crushes.filter((crush) => crush.id === parseInt(id, 10)));

const removeCrush = (id) =>
  readFileCrush().then((crushes) => crushes.filter((crush) => crush.id !== parseInt(id, 10)));

const findByName = (name) =>
  readFileCrush().then((crushes) => crushes.filter((crush) => crush.name === name));

module.exports = { getCrush, getAllCrushs, removeCrush, findByName };
