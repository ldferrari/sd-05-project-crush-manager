module.exports = (req, res, next) => {
  const { date } = req.body;
  const regEx = /[0-9][1-9]\/[0-9][0-9]\/[1-2][0-9][0-9][0-9]/;

  if (!date || date.rate === undefined || !date.datedAt) {
    return res.status(400).json({
      message: 'O campo "date" é obrigatório e "datedAt" e "rate" não podem ser vazios',
    });
  }

  if (date.rate < 1 || date.rate > 5) {
    return res.status(400).json({
      message: 'O campo "rate" deve ser um inteiro de 1 à 5',
    });
  }

  if (!regEx.test(date.datedAt)) {
    return res.status(400).json({
      message: 'O campo "datedAt" deve ter o formato "dd/mm/aaaa"',
    });
  }
  return next();
};
