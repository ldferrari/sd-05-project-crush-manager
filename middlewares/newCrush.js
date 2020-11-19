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

module.exports = (req, res) => {
  // const { body } = req;
  const nome = req.body.name;
  console.log(nome);
  const idade = req.body.age;
  console.log(idade);
  const data = req.body.date.datedAt;
  console.log(data);
  const rating = req.body.date.rate;
  console.log(data);
  const nameIsValid = vName(nome);
  console.log(nameIsValid);
  const ageIsValid = vAge(idade);
  console.log(ageIsValid);
  const dateIsValid = vDate(data);
  console.log(ageIsValid);
  const rateIsValid = vRate(rating);
  console.log(rateIsValid);

  if (!nome) {
    return res.status(400).json({ message: 'message": "O campo "name" é obrigatório' });
  } if (!nameIsValid) {
    return res.status(400).json({ message: 'O "name" deve ter pelo menos 3 caracteres' });
  } if (!idade) {
    return res.status(400).json({ message: 'O campo "age" é obrigatório' });
  } if (!ageIsValid) {
    return res.status(400).json({ message: 'O crush deve ser maior de idade' });
  } if (!data || !rating) {
    return res.status(400).json({ message: 'O campo "date" é obrigatório e "datedAt" e "rate" não podem ser vazios' });
  } if (!dateIsValid) {
    return res.status(400).json({ message: 'O campo "datedAt" deve ter o formato "dd/mm/aaaa"' });
  } if (!rateIsValid) {
    return res.status(400).json({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
  } 
  if (nameIsValid && ageIsValid && dateIsValid && rateIsValid) {
    return res.status(201).json({
      id: 1,
      name: 'Keanu Reeves',
      age: 56,
      date: {
        datedAt: '22/10/2019',
        rate: 5,
      },
    });
  } return res.status(401).json('deu ruim');
};
