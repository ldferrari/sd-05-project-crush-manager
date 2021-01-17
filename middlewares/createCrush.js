// requisito 2
const checkedFormatDate = require('../services/checkedFormatDate');

module.exports = async (req, res, next) => {
  const { name, age, date } = req.body;
  // certificando do name
  if (!name) {
    return res.status(400).json({ message: 'O campo "name" é obrigatório' });
  }
  if (name.length < 3) {
    return res.status(400).json({ message: 'O "name" deve ter pelo menos 3 caracteres' });
  }
  // certificando age
  if (!age) {
    return res.status(400).json({ message: 'O campo "age" é obrigatório' });
  }
  if (age >= 18) {
    return res.status(400).json({ message: 'O crush deve ser maior de idade' });
  }
  // certificando date, datedAt e rate
  if (!date || !date.datedAt || date.rate === undefined) {
    return res.status(400).json({ message: 'O campo "date" é obrigatório e "datedAt" e "rate" não podem ser vazios' });
  }
  if (!checkedFormatDate(date.datedAt)) {
    return res.status(400).json({ message: 'O campo "datedAt" deve ter o formato "dd/mm/aaaa"' });
  }
  if (date.rate < 1 || date.rate > 5) {
    return res.status(400).json({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
  }
  next();
};

// {id
//   "name": "Keanu Reeves",
//   "age": 56,
//   "date": {
//     "datedAt": "22/10/2019",
//     "rate": 5
//   }
// }
// O campo name deverá ter no mínimo 3 caracteres. Ele é obrigatório.
// Caso o campo não seja passado ou esteja vazio retorne um código de status 400,
// com o seguinte corpo:
// {
//   "message": "O campo \"name\" é obrigatório"
// }
// Caso o nome não tenha pelo menos 3 caracteres retorne um código de status 400,
// com o seguinte corpo:
// {
//   "message": "O \"name\" deve ter pelo menos 3 caracteres"
// }
// O campo age deverá ser um inteiro e apenas pessoas maiores de idade
// (pelo menos 18 anos) podem ser cadastrados. Ele é obrigatório.

// {
//   "message": "O campo \"age\" é obrigatório"
// }
// Caso o crush não tenha pelo menos 18 anos retorne status 400, com o seguinte corpo:

// {
//   "message": "O crush deve ser maior de idade"
// }
