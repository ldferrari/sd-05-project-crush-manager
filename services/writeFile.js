const fs = require('fs').promises;

module.exports = async (filename, file) =>
  fs.writeFile(filename, JSON.stringify(file), 'utf8', (error) => {
    if (error) {
      return console.log(error);
    }
    return filename;
  });
