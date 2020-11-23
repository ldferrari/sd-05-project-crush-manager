const { createCrush, readCrushFile } = require('../utils');

const dateVerify = (dateString) => {
  const dateRegex = /^(0[1-9]|[12][0-9]|3[01])[/](0[1-9]|1[012])[/](19|20)\d\d$/g;
  return dateRegex.test(String(dateString));
};

module.exports = async (req, res, _next) => {
  const token = req.headers.authorization;
  const { name, age, date } = req.body;
  const { rate, datedAt } = req.body.date ? date : '';
  //  crush name validation
  if (!name) return res.status(400).json({ message: 'O campo "name" é obrigatório' });
  if (name.length < 3) {
    return res.status(400).json({ message: 'O "name" deve ter pelo menos 3 caracteres' });
  }
  //  age validation
  if (!age) return res.status(400).json({ message: 'O campo "age" é obrigatório' });
  if (age < 18) return res.status(400).json({ message: 'O crush deve ser maior de idade' });
  //  rate verify
  if (rate === 0 || rate < 1 || rate > 5) {
    return res.status(400).json({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
  }
  if (!rate || rate === '') {
    return res
      .status(400)
      .json({ message: 'O campo "date" é obrigatório e "datedAt" e "rate" não podem ser vazios' });
  }
  //  date valitation
  if (!date || date === '') {
    return res
      .status(400)
      .json({ message: 'O campo "date" é obrigatório e "datedAt" e "rate" não podem ser vazios' });
  }
  if (!datedAt || datedAt === '') {
    return res
      .status(400)
      .json({ message: 'O campo "date" é obrigatório e "datedAt" e "rate" não podem ser vazios' });
  }
  if (!dateVerify(datedAt)) {
    return res.status(400).json({ message: 'O campo "datedAt" deve ter o formato "dd/mm/aaaa"' });
  }
  if (token) {
    const crushList = JSON.parse(await readCrushFile('./crush.json'));
    const crushId = crushList.length + 1;
    const crush = { ...req.body, id: crushId };
    await createCrush('./crush.json', crush);
    return res.status(201).json(crush);
  }
};
