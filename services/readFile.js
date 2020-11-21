const fs = require('fs').promises;

module.exports = async (fileName) =>
  fs.readFile(fileName, 'utf8', (error, data) => {
    if (error) {
      return console.log(error);
    }

    return data;
  });
