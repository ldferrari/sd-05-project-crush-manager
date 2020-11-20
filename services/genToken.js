const randToken = require('rand-token');

const genToken = () => {
  const token = randToken.generate(16);
  return { token };
}

module.exports = genToken;

// honestidade academica = peguei a função do PR do Paulo Dandrea.
