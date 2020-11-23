const fs = require('fs').promises;

const readList = async () => {
  const readFile = await fs.readFile('./crush.json', 'utf-8');
  return JSON.parse(readFile);
};

const checkDate = (date) =>
  date.match(/^(0[1-9]|[12][0-9]|3[01])[- /.](0[1-9]|1[012])[- /.](19|20)\d\d$/);

module.exports = {
  readList,
  checkDate,
};
