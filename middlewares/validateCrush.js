const rescue = require('express-rescue');

const validateCrush = rescue(async (req, res, next) => {
  const { name, age, date } = req.body;
  const regex = /^\d\d\/\d\d\/\d\d\d\d$/;

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

  if (!date || date.rate === undefined || !date.datedAt) {
    return res
      .status(400)
      .json({ message: 'O campo "date" é obrigatório e "datedAt" e "rate" não podem ser vazios' });
  }

  if (date.rate < 1 || date.rate > 5) {
    return res
      .status(400)
      .json({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
  }

  if (!regex.test(date.datedAt)) {
    return res
      .status(400)
      .json({ message: 'O campo "datedAt" deve ter o formato "dd/mm/aaaa"' });
  }

  next();
});

module.exports = validateCrush;
