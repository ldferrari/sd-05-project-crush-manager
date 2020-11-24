const dateIsValid = require('./dateIsValid');

const dispatchDate = (crush) => {
  const { name, age, date } = crush;
  const { rate, datedAt } = crush.date ? date : '';
  let message = 'ok';
  //  crush name validation
  if (!name) {
    message = 'O campo "name" é obrigatório';
    return { message };
  }
  if (name.length < 3) {
    message = 'O "name" deve ter pelo menos 3 caracteres';
    return { message };
  }
  //  age validation
  if (!age) {
    message = 'O campo "age" é obrigatório';
    return { message };
  }
  if (age < 18) {
    message = 'O crush deve ser maior de idade';
    return { message };
  }
  //  rate verify
  if (rate === 0 || rate < 1 || rate > 5) {
    message = 'O campo "rate" deve ser um inteiro de 1 à 5';
    return { message };
  }
  if (!rate || rate === '') {
    message = 'O campo "date" é obrigatório e "datedAt" e "rate" não podem ser vazios';
    return { message };
  }
  //  date valitation
  if (!date || date === '') {
    message = 'O campo "date" é obrigatório e "datedAt" e "rate" não podem ser vazios';
    return { message };
  }
  if (!datedAt || datedAt === '') {
    message = 'O campo "date" é obrigatório e "datedAt" e "rate" não podem ser vazios';
    return { message };
  }
  if (!dateIsValid(datedAt)) {
    message = 'O campo "datedAt" deve ter o formato "dd/mm/aaaa"';
    return { message };
  }

  return message;
};

module.exports = dispatchDate;
