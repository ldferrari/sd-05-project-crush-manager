const fs = require('fs').promises;

module.exports = async (file, content) =>
  fs.writeFile(file, JSON.stringify(content), 'utf8', (error) => {
    return error ? console.log(error) : file;
  });
