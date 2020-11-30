const fs = require('fs').promises;

const readFile = async () => {
  const datas = await fs.readFile('./crush.json', 'utf-8');
  return JSON.parse(datas);
};

const writeFile = async (newCrush) => {
  const crushes = await readFile();
  const crushObj = { ...newCrush, id: crushes.length + 1 };
  crushes.push(crushObj);
  await fs.writeFile('./crush.json', JSON.stringify(crushes), 'utf-8');
  return crushObj;
};

const updateFile = async (crushes) => {
  await fs.writeFile('./crush.json', JSON.stringify(crushes), 'utf-8');
  return crushes;
};

module.exports = { readFile, writeFile, updateFile };
