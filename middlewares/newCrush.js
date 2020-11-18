const express = require('express');

function vName(nome) {
  const nRegex = /^.{3,}$/;
  return nRegex.test(nome);
}

function vAge(age) {
  const maior = age > 18;
  const Int = Number.isInteger(age);
  return (maior && Int);
}

module.exports = (req, res) => {
  // const { body } = req;
  const nome = req.body.name;
  console.log(nome);
  const idade = req.body.age;
  console.log(idade);
  const nameIsValid = vName(nome);
  console.log(nameIsValid);
  const ageIsValid = vAge(idade);
  console.log(ageIsValid);

  if(!nome) {
    return res.status(400).json({ message: 'message": "O campo "name" é obrigatório' });
  } else if (!nameIsValid) {
    return res.status(400).json({ message: 'O "name" deve ter pelo menos 3 caracteres' });
  } else if (!idade) {
    return res.status(400).json({ message: 'O campo "age" é obrigatório' });
  } else if (!ageIsValid) {
    return res.status(400).json({ message: 'O crush deve ser maior de idade' });
  } else if (nameIsValid && ageIsValid) {
    return res.status(201).json({
      id: 1,
      name: "Keanu Reeves",
      age: 56,
      date: {
        datedAt: "22/10/2019",
        rate: 5,
      },
  });
  } else {
    return res.status(401).json('deu ruim');
  }
};
