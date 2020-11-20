const fs = require('fs').promises;
const path = require('path');

const readCrush = () => (
  fs.readFile(path.resolve(__dirname, '../crush.json'), 'utf-8')
    .then((response) => JSON.parse(response))
);

module.exports = {
  readCrush,
};
