const crypto = require('crypto');

const token = crypto.randomBytes(8).toString('hex');

const getToken = async (req, res, next) => {
  const { authorization } = req.headers;
  console.log(authorization);

  if (!authorization) {
    res.status(401).json({ message: 'Token não encontrado' });
  }
  if (authorization.length !== 16) {
    res.status(401).json({ message: 'Token inválido' });
  }

  res.status(200).json({ token });

  next();
};

module.exports = { getToken };
