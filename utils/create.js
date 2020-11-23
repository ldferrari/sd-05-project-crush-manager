const fs = require('fs').promises;

module.exports = async (file, inputData) => {
  fs.writeFile(inputData, JSON.stringify(file), 'utf8', (error) => {
    if (error) return console.log(error);
    return inputData;
  });
};