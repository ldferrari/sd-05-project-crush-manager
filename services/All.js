// Promise = assincrono
const fs = require('fs').promises;

const ler = async () => {
  const getCrush = await fs.readFile('./crush.json', 'utf8');
  const obj = JSON.parse(getCrush);
  return obj;
};

ler();

module.exports = { ler };

/* const criar = async () => {
  const addCrush = await fs.writeFile('./crush.json', 'utf8');
}
*/