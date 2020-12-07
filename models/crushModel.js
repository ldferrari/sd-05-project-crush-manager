const { readFileCrush } = require('./readFile');

const getCrush = (id) =>
  readFileCrush().then((crushes) => crushes.find((crush) => crush.id === parseInt(id, 10)));

const removeCrush = (id) =>
  readFileCrush().then((crushes) => crushes.filter((crush) => crush.id !== parseInt(id, 10)));

const findByName = (name) =>
  readFileCrush().then((crushes) => crushes.filter((crush) => crush.name === name));

module.exports = { getCrush, removeCrush, findByName };
