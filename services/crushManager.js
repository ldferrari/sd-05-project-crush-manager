const fs = require('fs');

const lerCrush = () => {
  const result = fs.readFileSync('./crush.json', 'utf-8');
  return JSON.parse(result);
};

const gravarCrush = (novoCrush) => {
  fs.writeFileSync('./crush.json', novoCrush, 'utf-8');
};

module.exports = {
  lerCrush,
  gravarCrush,
};
