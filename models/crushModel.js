const { readFileCrush } = require('./readFile');

const getCrush = (id) =>
  readFileCrush().then((crushes) => crushes.find((crush) => crush.id === parseInt(id, 10)));

const removeCrush = (id) =>
  readFileCrush().then((crushes) => crushes.filter((crush) => crush.id !== parseInt(id, 10)));

module.exports = { getCrush, removeCrush };
