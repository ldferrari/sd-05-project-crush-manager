const fs = require('fs').promises;

module.exports = async (fileName) =>
  fs.readFile(fileName, 'utf8', (err, data) => {
    if (err) {
      return console.log(err);
    }
    return data;
  });
