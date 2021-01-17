const { readJSON } = require('../services/allCrush');

// underscore require
module.exports = async (_, res) => {
  const listarList = await readJSON();
  if (!listarList) return [];
  return res.status(200).json(listarList);
};
// console.log(typeof listarList);
