const fs = require('fs').promises;

const readFileCrush = async () => {
  try {
    const crushFile = await fs.readFile('./crush.json', 'utf-8');
    return JSON.parse(crushFile);
  } catch (err) {
    console.log(err);
  }
  return [];
};

module.exports = { readFileCrush };
