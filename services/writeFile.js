const fs = require('fs').promises;

module.exports = async (file, content) =>
  fs.writeFile(file, JSON.stringify(content), 'utf8', (error) => {
    if (error) {
      console.log(error);
    }

    return file;
  });
