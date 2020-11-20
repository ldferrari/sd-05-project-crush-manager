function vName(nome) {
  const nRegex = /^.{3,}$/;
  return nRegex.test(nome);
}

function vAge(age) {
  const maior = age > 18;
  const Int = Number.isInteger(age);
  return (maior && Int);
}

function vDate(date) {
  const dRegex = /(0[1-9]|[12][0-9]|3[01])[- /.](0[1-9]|1[012])[- /.](19|20)\d\d/;
  return dRegex.test(date);
}

function vRate(rate) {
  const Int = Number.isInteger(rate);
  const maiorMenor = rate >= 1 && rate <= 5;
  return (Int && maiorMenor);
}

const CrushValidate = (req, res, next) => {
  const nome = req.body.name;
  // console.log(nome);
  const idade = req.body.age;
  // console.log(idade);
  const { date } = req.body;
  const { authorization } = req.headers;
  // console.log(authorization);
  if (!authorization) {
    return res.status(401).json({ message: 'Token não encontrado' });
  }
  if (authorization.length !== 16) {
    return res.status(401).json({ message: 'Token inválido' });
  }
  if (!nome) {
    return res.status(400).json({ message: 'O campo "name" é obrigatório' });
  }
  const nameIsValid = vName(nome);
  // console.log(nameIsValid);
  if (!nameIsValid) {
    return res.status(400).json({ message: 'O "name" deve ter pelo menos 3 caracteres' });
  } if (!idade) {
    return res.status(400).json({ message: 'O campo "age" é obrigatório' });
  } const ageIsValid = vAge(idade);
  console.log(ageIsValid);
  if (!ageIsValid) {
    return res.status(400).json({ message: 'O crush deve ser maior de idade' });
  } if (!date) {
    return res.status(400).json({ message: 'O campo "date" é obrigatório e "datedAt" e "rate" não podem ser vazios' });
  }
  if (date.rate === 0) {
    return res.status(400).json({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
  }
  if (!date.datedAt || !date.rate) {
    return res.status(400).json({ message: 'O campo "date" é obrigatório e "datedAt" e "rate" não podem ser vazios' });
  } const dateIsValid = vDate(date.datedAt);
  const rateIsValid = vRate(date.rate);
  // console.log(rateIsValid);
  if (!dateIsValid) {
    return res.status(400).json({ message: 'O campo "datedAt" deve ter o formato "dd/mm/aaaa"' });
  } if (!rateIsValid) {
    return res.status(400).json({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
  }
  if (nameIsValid && ageIsValid && dateIsValid && rateIsValid) {
    return next();
  } return res.status(401).json('deu ruim');
};

module.exports = CrushValidate;
