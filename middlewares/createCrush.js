const rescue = require('express-rescue');
const crushes = require('../crush.json');

module.exports = rescue(async (req, res, next) => {
  const { name, age, date } = req.body;
  const id = crushes.length + 1;
  const re = /\d{2}\/\d{2}\/\d{4}/ig;

  // [HONESTIDADE ACADEMICA]  entre varios maneiras de validar um formato de data com REGEX, eu optei por fazer parecido com o PR do lizzard, por parecer mais simples

  if (!name) {
    return res.status(400).json({ message: 'O campo "name" é obrigatório' });
  }
  if (name.length < 3) {
    return res.status(400).json({ message: 'O "name" deve ter pelo menos 3 caracteres' });
  }
  if (age < 18) {
    return res.status(400).json({ message: 'O crush deve ser maior de idade' });
  }
  if (!age) {
    return res.status(400).json({ message: 'O campo "age" é obrigatório' });
  }
  if (!date || date === null || !(date.datedAt && date.rate)) {
    return res.status(400).json({ message: 'O campo "date" é obrigatório e "datedAt" e "rate" não podem ser vazios' });
  }
  if (!(date.datedAt.match(re))) {
    return res.status(400).json({ message: 'O campo "datedAt" deve ter o formato "dd/mm/aaaa"',
    });
  }
  if (typeof date.rate !== 'number' || date.rate < 1 || date.rate > 5) {
    return res.status(400).json({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
  }

  req.body.id = id;
  crushes.push({ id, name, age, date });
  // console.log("crush:", crushes);

  next();
});
