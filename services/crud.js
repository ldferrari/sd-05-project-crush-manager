/* arquivo para todas as funções CRUD com fs */

const fs = require('fs').promises;

const createCrush = async (array, newCrush) => {
  const newArray = [...array, newCrush];
  fs.writeFile('./crush.json', JSON.stringify(newArray));
};

const readCrush = async () => {
  const arrayOfCrushes = await fs.readFile('./crush.json', 'utf-8');
  return JSON.parse(arrayOfCrushes);
};

const updateCrush = async (newCrushArray) => {
  fs.writeFile('./crush.json', JSON.stringify(newCrushArray));
};

module.exports = { readCrush, createCrush, updateCrush };
