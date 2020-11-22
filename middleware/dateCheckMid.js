module.exports = (req, res, next) => {
  const { date } = req.body;

  if (!date || !date.datedAt || date.rate === undefined) {
    return res.status(400).json({
      message: 'O campo "date" é obrigatório e "datedAt" e "rate" não podem ser vazios',
    });
  }

  if (!/^\d{1,2}\/\d{1,2}\/\d{4}$/.test(date.datedAt)) {
    return res.status(400).json({
      message: 'O campo "datedAt" deve ter o formato "dd/mm/aaaa"',
    });
  }

  if (!Number.isInteger(date.rate)) {
    return res.status(400).json({
      message: 'O campo "rate" deve ser um número inteiro',
    });
  }

  if (date.rate < 1 || date.rate > 5) {
    return res.status(400).json({
      message: 'O campo "rate" deve ser um inteiro de 1 à 5',
    });
  }

  return next();
};
