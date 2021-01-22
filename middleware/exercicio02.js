const readFiles = require('./readFiles');
const writeFiles = require('./writeFiles');

const exercicio02 = async (req, res) => {
  const oldCrushs = await readFiles();
  const newPerson = req.body;
  newPerson.id = oldCrushs.length + (1);
  const newCrushs = [...oldCrushs, newPerson];
  await writeFiles(newCrushs);
  return res.status(201).json(newPerson);
};

module.exports = exercicio02;
