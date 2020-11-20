const validaIdade = (req, res, next) => {
  const { age } = req.body;

  if (age === undefined || age === '') {
    return res.status(400).json({
      message: 'O campo "age" é obrigatório',
    });
  }

  if (name.length < 18) {
    return res.status(400).json({
      message: 'O crush deve ser maior de idade',
    });
  }

  return next();
};

module.exports = validaIdade;
