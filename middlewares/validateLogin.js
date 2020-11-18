const rescue = require('express-rescue');

const validateLogin = rescue(async (req, res, next) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({
      message: 'O campo "email" é obrigatório',
    });
  }

  return next();
});

module.exports = validateLogin;
