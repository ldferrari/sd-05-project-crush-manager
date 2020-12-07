const fs = require('fs');

module.exports = (file) => {
  fs.writeFile('./crush.json', JSON.stringify(file, null, 2), (error) => {
    if (error) throw new Error(error);
  });
};
