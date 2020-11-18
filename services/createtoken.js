const randtoken = require('rand-token');

function createToken() {
  const token = randtoken.generate(16);
  return { token };
}

module.exports = createToken;
