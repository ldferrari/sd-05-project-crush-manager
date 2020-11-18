const errorMiddleware = require('./err.middleware');
const authMiddleware = require('./auth.middleware');
const crushMiddleware = require('./crush.middleware');

module.exports = {
  errorMiddleware,
  authMiddleware,
  crushMiddleware,
};
