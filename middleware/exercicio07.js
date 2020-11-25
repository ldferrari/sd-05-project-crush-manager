const readFiles = require('./readFiles');

const exercicio07 = async (req, res) => {
  const name = req.query.q;
  console.log(name);
  const readCrushs = await readFiles();
  const crushFind = readCrushs.filter((crush) => crush.name.includes(name));
  if (!name || name === '') {
    res.status(200).json(readCrushs);
  }
  res.status(200).json(crushFind);
};

module.exports = exercicio07;
