const { readCrushFile } = require('../utils');

module.exports = async (req, res) => {
  const idParam = Number(req.params.id);
  const crushs = JSON.parse(await readCrushFile('./crush.json'));
  const crush = crushs.find((person) => person.id === idParam);
  return crush
    ? res.status(200).json(crush)
    : res.status(404).json({ message: 'Crush não encontrado' });
};
