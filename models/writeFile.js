const fs = require('fs').promises;

const writeCrushFile = async (crushs) => {
  try {
    await fs.writeFile('crush.json', JSON.stringify(crushs));
  } catch (err) {
    console.log('erro: ', err);
  }
  return [];
};

module.exports = { writeCrushFile };
