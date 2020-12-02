const fs = require('fs').promises;

const crushFile = 'crush.json';

function writeCrush(newFiles) {
  fs.writeFile(crushFile, JSON.stringify(newFiles), (err) => {
    if (err) throw err;
  });
}

module.exports = {
  writeCrush,
};
