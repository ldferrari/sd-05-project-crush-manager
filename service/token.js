const token = require('rand-token');

const geradorToken = () => {
  const geraToken = token.generate(16);
  return geraToken;
};

//console.log(geradorToken());

module.exports = geradorToken;