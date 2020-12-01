const nameIsValid = (name) => {
  if (!name) {
    return {
      message: 'O campo "name" é obrigatório',
    };
  }
  if (name.length < 3) {
    return {
      message: 'O "name" deve ter pelo menos 3 caracteres',
    };
  }
  return true;
};

const ageIsValid = (age) => {
  if (!age) {
    return {
      message: 'O campo "age" é obrigatório',
    };
  }
  if (age < 18) {
    return {
      message: 'O crush deve ser maior de idade',
    };
  }
  return true;
};

const dateIsValid = (date) => {
  const regDate = /^[0-9]{2}\/[0-9]{2}\/[0-9]{4}$/;
  if (date.rate > 5 || date.rate < 1) {
    return {
      message: 'O campo "rate" deve ser um inteiro de 1 à 5',
    };
  }
  if (!date || !date.datedAt || !date.rate) {
    return {
      message: 'O campo "date" é obrigatório e "datedAt" e "rate" não podem ser vazios',
    };
  }
  if (!regDate.test(date.datedAt)) {
    return {
      message: 'O campo "datedAt" deve ter o formato "dd/mm/aaaa"',
    };
  }
  return true;
};

module.exports = { nameIsValid, ageIsValid, dateIsValid };
