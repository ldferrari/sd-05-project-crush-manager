const crud = require('../models');

module.exports = async (query) => {
  const allCrushes = await crud.read();

  if (!query || !query.length) return allCrushes;

  return allCrushes.filter((crush) => crush.name.includes(query));
};
