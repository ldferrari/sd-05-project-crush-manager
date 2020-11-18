const rescue = require('express-rescue');

const validateCrush = rescue(async (req, res, next) => {
  const { name, age, date } = req.body;

  if (!name) {
    return res
      .status(400)
      .json({ message: 'O campo "name" é obrigatório' });
  }

  if (name.length < 3) {
    return res
      .status(400)
      .json({ message: 'O "name" deve ter pelo menos 3 caracteres' });
  }

  if (!age) {
    return res
      .status(400)
      .json({ message: 'O campo "age" é obrigatório' });
  }

  if (age < 18) {
    return res
      .status(400)
      .json({ message: 'O crush deve ser maior de idade' });
  }

  if (!date) {
    return res
      .status(400)
      .json({ message: 'O campo "date" é obrigatório e "datedAt" e "rate" não podem ser vazios' });
  }

  next();
});

module.exports = validateCrush;
