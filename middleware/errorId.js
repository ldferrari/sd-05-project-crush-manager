const readFiles = require('./readFiles');

const errorId = async (req, res, next) => {
  const id = parseInt(req.params.id, 10);
  const readCrushs = await readFiles();
  const person = readCrushs.find((element) => element.id === id);

  if (!person || person === undefined) {
    res.status(404).json({ message: 'Crush não encontrado' });
  }
  next();
};

module.exports = errorId;
