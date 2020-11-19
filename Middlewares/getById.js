const rescue = require('express-rescue');
const { readCrushFile } = require('../Services');

module.exports = rescue(async (req, res) => {
  const id = Number(req.params.id);
  const crushData = await readCrushFile();

  const choosenCrush = crushData.find((e) => id === e.id);

  if (choosenCrush) {
    res.status(200).json(choosenCrush);
  } else {
    res.status(404).json({ message: 'Crush não encontrado' });
  }
});
