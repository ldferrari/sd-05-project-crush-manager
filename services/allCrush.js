// metodo 'filesystem = fs' promise = assincrono
const fs = require('fs').promises;

const readJSON = async () => {
  const getCrushJSON = await fs.readFile('./crush.json', 'utf-8');
  const tratadoGetCrushJSON = JSON.parse(getCrushJSON);
  return tratadoGetCrushJSON;
};

module.exports = { readJSON };
