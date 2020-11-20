const fs = require('fs').promises;

async function readFileCrush() {
  const crushFile = await fs.readFile('./crush.json', 'utf-8', (err, file) => {
    if (err) {
      throw err;
    }
    return file;
  });

  return JSON.parse(crushFile);
}

module.exports = readFileCrush;
