const rescue = require('express-rescue');

const validateCrush = rescue(async (req, res, next) => {
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({
      message: 'O campo "name" é obrigatório',
    });
  }

  next();
});

module.exports = validateCrush;
