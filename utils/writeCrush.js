const fs = require('fs').promises;

module.exports = async (fileName, file) =>
  fs.writeFile(fileName, JSON.stringify(file), 'utf8', (err) => {
    if (err) {
      return console.log(err);
    }

    return fileName;
  });
