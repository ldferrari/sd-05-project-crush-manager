const fs = require('fs').promises;
const path = require('path');

module.exports = async (dir, file) => {
  const content = await fs.readFile(path.resolve(dir, '.', file));
  return JSON.parse(content.toString('utf-8'));
};
