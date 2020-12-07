const fs = require('fs');

module.exports = (callback) => {
  fs.readFile('../../crush.json', (error, data) => {
    if (error) throw new Error(error);
    callback(data);
  });
};
