const randtoken = require('rand-token');

const token = () => randtoken.generate(16).toString();

module.exports = token;
