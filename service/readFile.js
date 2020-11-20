const fs = require('fs');

const readCrush = async () => {
  const data = await fs.readFile('./crush.json', 'urt-8');
  return JSON.parse(data);
};

module.exports = readCrush;
