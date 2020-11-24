const fs = require('fs').promises;

module.exports = async (file, inputData) => {
  fs.writeFile(file, JSON.stringify(inputData), 'utf8', (error) => {
    if (error) return console.log(error);
    return inputData;
  });
};
