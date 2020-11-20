const randon = require('rand-token');

module.exports = () => ({ token: randon.generate(16) });
