const readFiles = require('./readFiles');

const exercicio03vazio = async (req, res) => {
  const crush = await readFiles();
  const { id } = req.params;
  const filterPerson = crush.find((person) => (person.id === id)) || [];
  res.status(200).send(filterPerson);
};

module.exports = exercicio03vazio;
