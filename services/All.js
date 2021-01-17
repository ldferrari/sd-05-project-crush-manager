// Promise = assincrono
const fs = require('fs').promises;

const ler = async () => {
  const getCrush = await fs.readFile('./crush.json', 'utf8');
  const obj = JSON.parse(getCrush);
  return obj;
};

module.exports = { ler };
