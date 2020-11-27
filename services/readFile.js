const fs = require('fs').promises;

module.exports = async (file) =>
  fs.readFile(file, 'utf8', (error, content) => {
    if (error) {
      console.log(error);
    }

    return content;
  });
