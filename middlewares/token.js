const randtoken = require('rand-token');

const genToken = () => {
  const token = randtoken.generate(16);
  return { token };
};

module.exports = genToken;
