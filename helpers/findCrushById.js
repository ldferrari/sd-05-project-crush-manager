const { readCrush } = require('./readCrush');

const findCrushById = async (id) => {
  const file = await readCrush();
  const crushToFind = file.filter((crush) => crush.id === parseInt(id, 10));
  return crushToFind[0];
};

module.exports = {
  findCrushById,
};
