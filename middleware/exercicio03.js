const readFiles = require('./readFiles');

const exercicio03 = async (_req, res) => {
  const crush = await readFiles();
  return res.status(200).send(crush);
};

module.exports = exercicio03;
