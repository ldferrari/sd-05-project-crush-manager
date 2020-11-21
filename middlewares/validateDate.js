// Referência:
// https://stackoverflow.com/questions/6177975/how-to-validate-date-with-format-mm-dd-yyyy-in-javascript

const moment = require('moment');

const validateDate = (req, res, next) => {
  const { date } = req.body;

  if (!date || !date.datedAt || date.rate === undefined) {
    res
      .status(400)
      .json({ message: 'O campo "date" é obrigatório e "datedAt" e "rate" não podem ser vazios' });
  }

  if (!moment(date.datedAt, 'DD/MM/AAAA').isValid()) {
    res.status(400).json({ message: 'O campo "datedAt" deve ter o formato "dd/mm/aaaa"' });
  }

  if (date.rate < 1 || date.rate > 5) {
    res.status(400).json({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
  }

  next();
};

module.exports = validateDate;
