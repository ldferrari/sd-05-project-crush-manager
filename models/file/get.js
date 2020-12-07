const fs = require('fs').promises;

module.exports = () => fs.readFile('./crush.json', (error) => {
  if (error) throw new Error(error);
});
