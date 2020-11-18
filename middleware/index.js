const errorMiddleware = require('./err.middleware');
const authMiddleware = require('./auth.middleware');

module.exports = {
  errorMiddleware,
  authMiddleware,
};
