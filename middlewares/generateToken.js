const tokenGenerator = require('../funcoes/tokenGenerator');

const generateToken = (_req, res) => {
  res.status(200).json({ token: tokenGenerator() });
};

module.exports = generateToken;
