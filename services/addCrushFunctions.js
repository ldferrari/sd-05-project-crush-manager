const fs = require('fs').promises;

const readCrushFile = async () => {
  const crushList = await fs.readFile('../crush.json', 'utf-8');
  return JSON.parse(crushList);
};

const writeCrushFile = async (currentCrushList, newCrush) => {
  const newCrushList = [...currentCrushList, newCrush];
  // const newCrushList = currentCrushList.push(newCrush);
  fs.writeFile('../crush.json', JSON.stringify(newCrushList));
};

module.exports = { readCrushFile, writeCrushFile };
