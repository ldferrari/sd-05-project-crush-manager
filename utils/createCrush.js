const fs = require('fs').promises;
const path = require('path');

module.exports = async (dir, file, content) => (
  fs.writeFile(
    path.resolve(dir, '.', file),
    JSON.stringify(content),
    (err) => {
      if (err) throw err;
    },
  )
);
