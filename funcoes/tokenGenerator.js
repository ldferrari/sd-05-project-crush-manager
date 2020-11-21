const crypto = require('crypto');

const tokenGenerator = () => crypto.randomBytes(8).toString('hex');

module.exports = tokenGenerator;
