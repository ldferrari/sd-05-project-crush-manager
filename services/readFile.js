const fs = require('fs').promises;

module.exports = async (file) =>
  fs.readFile(file, 'utf8', (error, content) => {
    return error ? console.log(error) : content;
  });
