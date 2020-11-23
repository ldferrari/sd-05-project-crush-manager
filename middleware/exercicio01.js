const crypto = require('crypto-js'); // Gerador de tokens

const exercicio01error = (_req, res, _next) => {
  const { MD5 } = crypto;
  const token = MD5().toString().substr(0, 16);
  res.status(200).json({ token });
};

module.exports = exercicio01error;
