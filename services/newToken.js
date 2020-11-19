const randtoken = require('rand-token');

function newToken() {
  const token = randtoken.generate(16);
  return { token };
}

module.exports = newToken;
