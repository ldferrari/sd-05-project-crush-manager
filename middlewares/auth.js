const crypto = require('crypto');

const token = crypto.randomBytes(8).toString('hex');

const getUser = async (req, res) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ message: 'Token não encontrado' });
  };
  if (authorization.length !== 16) {
    return res.status(401).json({ message: 'Token inválido' });
  }
  
  return res.status(200).json({ token });
};

module.exports = { getUser };
