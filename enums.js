const password = {
  isNull: { message: 'O campo "password" é obrigatório' },
  isSmall: { message: 'A "senha" deve ter pelo menos 6 caracteres' },
};

const email = {
  isNull: { message: 'O campo "email" é obrigatório' },
  isInvalid: { message: 'O "email" deve ter o formato "email@email.com"' },
};

const crush = {
  nullName: {
    message: 'O campo "name" é obrigatório',
  },
  smallName: {
    message: 'O "name" deve ter pelo menos 3 caracteres',
  },
  nullAge: {
    message: 'O campo "age" é obrigatório',
  },
  noAge: {
    message: 'O crush deve ser maior de idade',
  },
};

const date = {
  isInvalid: {
    message: 'O campo "datedAt" deve ter o formato "dd/mm/aaaa"',
  },
  invalidRate: {
    message: 'O campo "rate" deve ser um inteiro de 1 à 5',
  },
  isNull: {
    message: 'O campo "date" é obrigatório e "datedAt" e "rate" não podem ser vazios',
  },
};

module.exports = { password, email, crush, date };
