const crushValidation = (req, res, next) => {
  const { name, age, date } = req.body;
  const { datedAt, rate } = req.body.date;
  const regDate = /^[0-9]{2}\/[0-9]{2}\/[0-9]{4}$/;

  if (!name) {
    return res.status(400).json({ message: 'O campo "name" é obrigatório' });
  }
  if (name.length < 3) {
    return res.status(400).json({ message: 'O "name" deve ter pelo menos 3 caracteres' });
  }
  if (!age) {
    return res.status(400).json({ message: 'O campo "age" é obrigatório' });
  }
  if (age < 18) {
    return res.status(400).json({ message: 'O crush deve ser maior de idade' });
  }
  if (rate > 5 || rate < 1) {
    return res.status(400).json({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
  }
  if (!date || !datedAt || !rate) {
    return res.status(400).json({
      message: 'O campo "date" é obrigatório e "datedAt" e "rate" não podem ser vazios',
    });
  }
  if (!regDate.test(datedAt)) {
    return res.status(400).json({ message: 'O campo "datedAt" deve ter o formato "dd/mm/aaaa"' });
  }
  next()
};

module.exports = { crushValidation };
