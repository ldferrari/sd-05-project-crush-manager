// https://www.npmjs.com/package/rand-token
const randtoken = require('rand-token');

module.exports = () => ({ token: randtoken.generate(16) });
