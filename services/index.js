const fs = require('fs').promises;

const readList = async () => {
  const readFile = await fs.readFile('./crush.json', 'utf-8');
  return JSON.parse(readFile);
};

module.exports = {
  readList,
};
