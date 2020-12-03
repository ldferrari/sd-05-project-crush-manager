const randtoken = require('rand-token');

function generateToken() {
  const token = randtoken.generate(16);
  return { token };
}

module.exports = generateToken;
