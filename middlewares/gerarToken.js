const crypto = require('crypto');

module.exports = (_req, res) => {
  const token = crypto.randomBytes(8).toString('hex');
  return res.status(200).send({ token });
};
