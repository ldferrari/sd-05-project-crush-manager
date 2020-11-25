const fs = require('fs').promises;

const nameVal = (req, res, next) => {
  const { name } = req.body;
  if (name === undefined || name === '') {
    return res.status(400).json({ message: 'O campo "name" é obrigatório' });
  }
  if (name.length < 3) {
    return res.status(400).json({ message: 'O "name" deve ter pelo menos 3 caracteres',
    });
  }
  next();
};
const ageVal = (req, res, next) => {
  const { age } = req.body;

  if (age === undefined) {
    return res.status(400).json({ message: 'O campo "age" é obrigatório' });
  }

  if (age < 18) {
    return res.status(400).json({ message: 'O crush deve ser maior de idade' });
  }
  next();
};

const tokenVal = (req, res, next) => {
  const { authorization } = req.headers;
  if (authorization === undefined || authorization === null) {
    return res.status(401).json({ message: 'Token não encontrado' });
  }
  if (authorization.length !== 16 /* | | typeof authorization !== 'string' */) {
    return res.status(401).json({ message: 'Token inválido' });
  }
  next();
};

const dateVal = (req, res, next) => {
  const { date } = req.body;
  const regexDate = new RegExp(/([0][1-9]|[1-2][0-9]|[3][0-1])\/([0][1-9]|[1][0-2])\/(\d\d\d\d)/);

  if (date === undefined) {
    return res.status(400).json({ message: 'O campo "date" é obrigatório e "datedAt" e "rate" não podem ser vazios',
    });
  }
  if (date.datedAt === undefined) {
    return res.status(400).json({ message: 'O campo "date" é obrigatório e "datedAt" e "rate" não podem ser vazios',
    });
  }
  if (date.rate === undefined && date.rate !== 0) {
    return res.status(400).json({ message: 'O campo "date" é obrigatório e "datedAt" e "rate" não podem ser vazios',
    });
  }
  const { datedAt, rate } = date;
  if (!regexDate.test(datedAt)) {
    return res.status(400).json({ message: 'O campo "datedAt" deve ter o formato "dd/mm/aaaa"' });
  }
  if (rate < 1) {
    return res.status(400).json({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
  }
  if (rate > 5) {
    return res.status(400).json({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
  }
  next();
};

const readingCrushFile = async () => {
  const dataJSON = await fs.readFile('./crush.json', 'utf-8');
  const data = await (JSON.parse(dataJSON));
  const id = 1 + data.reduce((max, actual) =>
    (actual.id > max ? actual.id : max), 0);
  return { data, id };
};
const writingCrushFile = async (data) => {
  await fs.writeFile('./crush.json', JSON.stringify(data), 'utf-8', (err) => {
    if (err) {
      return console.log(err);
    }
    console.log('The file was saved!');
  });
  return null;
};

module.exports = { tokenVal, nameVal, ageVal, dateVal, readingCrushFile, writingCrushFile };
