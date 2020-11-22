const fs = require('fs').promises;
const express = require('express');
const path = require('path');
const router = express.Router();

const readCrushFile = async () => {
  const content = await fs.readFile(path.resolve(__dirname, '.', 'crush.json'));
  return JSON.parse(content.toString('utf-8'));
};

router.get('/', async (_req, res) => {
  const crush = await readCrushFile();
  res.status(200).send(crush);
});

router.get('/:id', async (req, res) => {
  const crush = await readCrushFile();
  const id = req.params.id;
  const filteredCharacter = crush.find(character => character.id === id) || [];
  res.status(200).send(filteredCharacter);
});

module.exports = router;
