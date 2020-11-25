const fs = require('fs').promises;

const readCrush = async () => {
  const arrayCrush = await fs.readFile('./crush.json', 'utf-8');
  return JSON.parse(arrayCrush);
};

const addCrush = async (currentArrayCrush, newCrush) => {
  const newCrushArray = [...currentArrayCrush, newCrush];
  fs.writeFile('./crush.json', JSON.stringify(newCrushArray));
};

const editCrush = async (newCrushArray) => {
  fs.writeFile('./crush.json', JSON.stringify(newCrushArray));
};

module.exports = { readCrush, addCrush, editCrush };
