const randToken = require('rand-token');

module.exports =  genToken = () => {
  const token = randToken.generate(16);
  return { token };
}

// honestidade academica = peguei a função do PR do Paulo Dandrea.