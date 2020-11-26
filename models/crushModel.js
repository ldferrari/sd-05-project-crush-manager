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
};

const dateIsValid = (date) => {
  const regDate = /^[0-9]{2}\/[0-9]{2}\/[0-9]{4}$/;
  if (!regDate.test(date)) {
    return {
      message: 'O campo "datedAt" deve ter o formato "dd/mm/aaaa"',
    };
  }
  if (!date) {
    return {
      message: 'O campo "datedAt" deve ter o formato "dd/mm/aaaa"',
    };
  }
  if (!date || !date.datedAt || !date.rate) {
    return {
      message: 'O campo "date" é obrigatório e "dateAt" e "rate" não podem ser vazios',
    };
  }
};

module.exports = { nameIsValid, ageIsValid, dateIsValid };
