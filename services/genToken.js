const randomKey = require('rand-token');

module.exports = () => ({ token: randomKey.generate(16) });
