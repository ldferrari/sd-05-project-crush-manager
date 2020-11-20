const { createProfile } = require('./createProfile');
const { readCrush } = require('./readCrush');

const findCrushById = async (id) => {
  const file = await readCrush();
  const crushToFind = file.filter((crush) => crush.id === parseInt(id));
  return crushToFind[0];
};

module.exports = {
  findCrushById,
};
