const fs = require('fs').promises;

const readFile = async () => {
  try {
    const crushs = await fs.readFile('crush.json', 'utf-8');
    return JSON.parse(crushs);
  } catch (err) {
    console.error('Error: ', err);
  }
};

module.exports = readFile;
