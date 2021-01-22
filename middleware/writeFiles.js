const fs = require('fs').promises;
const path = require('path');

const writeFiles = async (content) => (
  fs.writeFile(path.resolve(__dirname, '..', 'crush.json'),
    JSON.stringify(content),
    (err) => {
      if (err) throw err;
    })
);

module.exports = writeFiles;
