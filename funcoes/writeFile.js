const fs = require('fs').promises;

const writeFile = async (updatedCrushs) => {
  try {
    await fs.writeFile('crush.json', JSON.stringify(updatedCrushs));
  } catch (err) {
    console.error('Error: ', err);
  }
};

module.exports = writeFile;
