const rescue = require('express-rescue');
const fs = require('fs').promises;

module.exports = rescue(async (req, res, next) => {
  const { id: stringID } = req.params;
  const id = parseInt(stringID, 10);

  const readFromFile = await fs.readFile('crush.json');
  const array = JSON.parse(readFromFile);
  const loockupID = await array.find((obj) => obj.id === id);
  if (loockupID === undefined) {
    return res.status(404).json({ message: 'Crush não encontrado' });
  }
  next();
});
