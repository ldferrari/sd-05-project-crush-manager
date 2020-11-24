const fs = require('fs').promises;

const createCrush = async (file, inputData) => {
  fs.writeFile(file, JSON.stringify(inputData), 'utf8', (error) => {
    if (error) return console.log(error);
    return inputData;
  });
};

module.exports = createCrush;
