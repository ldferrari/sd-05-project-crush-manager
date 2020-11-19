const authMiddleware = require('./auth.middleware');
const errorMiddleware = require('./err.middleware');
const loginMiddleware = require('./login.middleware');
const {
  addCrush: addCrushMiddleware,
} = require('./crush.middleware');

module.exports = {
  authMiddleware,
  addCrushMiddleware,
  errorMiddleware,
  loginMiddleware,
};
