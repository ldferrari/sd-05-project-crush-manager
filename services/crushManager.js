const fs = require('fs');

const lerCrush = () => {
  const result = fs.readFileSync('./crush.json', 'utf-8');
  return JSON.parse(result);
};

const gravarCrush = (novoCrush) => {
  fs.writeFileSync('./crush.json', novoCrush, 'utf-8', (err) => {
    if (err) {
      return console.log(err);
    }
    console.log('The file was saved!');
  });
  return null;
};

module.exports = {
  lerCrush,
  gravarCrush,
};
