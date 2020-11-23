const fs = require('fs').promises;

module.exports = async (file) =>
  fs.readFile(file, 'utf8', (error, data) => (error ? console.log(error) : data));
